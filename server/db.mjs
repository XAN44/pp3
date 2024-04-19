import mysql from 'mysql2'
import bcrypt from 'bcrypt'
import { uploadProfileImageMiddleware, createJWTToken } from './middleware.mjs'

// ฟังก์ชั่นติดต่อฐานข้อมูล
function createMySQLConnection() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'agric',
    password: ']^ddiuj555556',
    database: 'agric',
    port: 8889,
  })

  connection.connect((err) => {
    if (err) {
      console.log('ไม่สามารถเชื่อมต่อฐานข้อมูลได้', err)
    } else {
      console.log(' conect to mysql sussces  ')
    }
  })

  return connection
}

// ฟังกช์ชั่นลงทะเบียน
export async function registerUser(req, res, connection) {
  console.log(req.body)
  const { username, email, password } = req.body
  const profileImageFile = req.files

  uploadProfileImageMiddleware(req, res, async (err) => {
    if (err) {
      return
    }
  })

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const checkDuplicateQuery = `SELECT * FROM users WHERE email = ? OR username = ?`
    const [duplicateResults] = await connection
      .promise()
      .query(checkDuplicateQuery, [email, username])

    if (duplicateResults.length > 0) {
      const duplicateUser = duplicateResults[0]
      if (duplicateUser.email === email) {
        return res.status(400).json({ error: 'อีเมลนี้มีการลงทะเบียนแล้ว' })
      } else if (duplicateUser.username === username) {
        return res
          .status(400)
          .json({ error: 'ชื่อผู้ใช้งานนี้มีการลงทะเบียนแล้ว' })
      }
    }

    // บันทึกรูปภาพในโฟลเดอร์บนเซิร์ฟเวอร์
    const profileImageFileName = Date.now() + '-' + profileImageFile.name
    profileImageFile.mv(
      'C:/agric/agric-production/public/profileImages' + profileImageFileName
    )
    try {
      const profileImageUrl = `/profileImages/${req.file.filename}`
      res.status(200).json({ imageUrl: profileImageUrl })
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:', error)
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ' })
    }
    // สร้าง URL ของรูปภาพในโฟลเดอร์ public/profileImages
    const profileImageUrl = `/profileImages/${profileImageFileName}`
    const imagesPath = '/agric-production/public/profileImages' // ตำแหน่งโฟลเดอร์ที่บันทึกรูปภาพ

    fs.readdir(imagesPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err)
        return res
          .status(500)
          .json({ error: 'An error occurred while reading directory' })
      }

      const imageFileNames = files.filter((file) =>
        file.match(/\.(jpeg|jpg|png|gif)$/i)
      )
      res.status(200).json({ imageFileNames })
    })
    // บันทึกข้อมูลในฐานข้อมูล
    const insertQuery = `INSERT INTO users (username, email, password, profileImage) VALUES (?, ?, ?, ?)`
    await connection
      .promise()
      .query(insertQuery, [username, email, hashedPassword, profileImageUrl])

    console.log('บันทึกข้อมูลสำเร็จ')
    res.status(200).json({ message: 'บันทึกข้อมูลสำเร็จ' })
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' })
  }
}

export async function loginUser(req, res, connection) {
  const { email, password } = req.body

  try {
    const getUserQuery = `SELECT * FROM users WHERE email = ?`
    const [userResults] = await connection
      .promise()
      .query(getUserQuery, [email])

    if (userResults.length === 0) {
      return res.status(400).json({
        error: 'ไม่พบผู้ใช้งาน',
      })
    }

    const user = userResults[0]
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json({
        error: 'รหัสผ่านไม่ถูกต้อง',
      })
    }

    const userId = user.user_id
    const userRole = user.role
    const token = createJWTToken(userId)

    req.session.userId = user.user_id
    req.session.token = token

    console.log('userId', req.session.userId)
    console.log('Token', req.session.token)

    res.cookie('token', token, {
      httpOnly: false, // ห้ามเอา token ด้วย Javascript (เพราะเป็น sensitive data)
      secure: true, // ไว้ใช้งานใน HTTPS เท่านั้น
      sameSite: 'none', // ระบุว่า cookie จะส่งได้ไฟล์เดียวกับโดเมนเท่านั้น
      maxAge: 1000 * 60 * 60 * 24, // หมดอายุหลังจาก 24 ชั่วโมง
      path: '/', // สามารถใช้งานได้ทุก path ของเว็บไซต์
    })

    res.status(200).json({
      message: 'เข้าสู่ระบบสำเร็จ',
      userId: user.user_id,
      userRole,
      token,
    })
  } catch (error) {
    console.log('error during login', error)
    res.status(500).json({
      error: 'เกิดข้อผิดพลาด',
    })
  }
}

export async function allProducts(req, res, connection) {
  try {
    const getProductsQuery = `
      SELECT
        products.*,
        users.username AS owner_username
      FROM products
      LEFT JOIN users ON products.user_id = users.user_id
    `

    const [productsResults] = await connection.promise().query(getProductsQuery)

    if (productsResults.length === 0) {
      return res.status(404).json({ error: 'ไม่พบสินค้าใด ๆ' })
    }

    const products = productsResults

    const productImagesPromises = products.map(async (product) => {
      const getProductImagesQuery = `SELECT image_url FROM product_images WHERE product_id = ?`
      const [imagesResults] = await connection
        .promise()
        .query(getProductImagesQuery, [product.product_id])

      return {
        ...product,
        product_images: imagesResults.map((image) => image.image_url),
      }
    })

    const productsWithImages = await Promise.all(productImagesPromises)

    res.status(200).json({ products: productsWithImages })
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าทั้งหมด', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าทั้งหมด' })
  }
}

export default createMySQLConnection
