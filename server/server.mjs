import express from 'express'
import mysql from 'mysql2'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import multer from 'multer'
import fileUpload from 'express-fileupload'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express()
const port = 3001

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
    console.log('เชื่อมต่อกับ MySQL สำเร็จแล้ว')
  }
})

app.use(bodyParser.json())
app.use(fileUpload())

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // เปลี่ยนเป็น false ในโหมด HTTP   credentials: true, // เปลี่ยนเป็น true ในโหมด HTTPS
    optionsSuccessStatus: 200,
  })
)

dotenv.config({
  path: 'C:/agric/agric-production/.env', // ระบุพาธเต็มของไฟล์ .env
})

app.use(cookieParser())

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // เปลี่ยนเป็น false ในโหมด HTTP   secure: true, // เป็น true ในโหมด HTTPS
      sameSite: 'Lax', // เปลี่ยนเป็น none ในโหมด HTTP   sameSite: 'none', // เป็น 'none' ในโหมด HTTPS
    },
  })
)

//JWT TOKEN

const secretKey = process.env.SECRET_KEY
if (!secretKey) {
  console.log('ค่า Secret_key ไม่ถูกต้อง ')
  process.exit(1)
}
// ฟังก์ชันเพื่อสร้าง JWT token
function createJWTToken(userId) {
  // สร้าง payload
  const payload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // หมดอายุหลังจาก 24 ชั่วโมง
  }

  try {
    // เข้ารหัส payload ด้วยคีย์ลับ
    const token = jwt.sign(payload, secretKey)
    return token
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการสร้าง Token', error)
    return null
  }
}

app.use('/profileImages', express.static('public/profileImages'))

// ฟังก์ชันสําหรับลงทะเบียน
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  const profileImageFile = req.files.profileImage
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!email.match(emailPattern)) {
    return res.status(400).json({ error: 'รูปแบบ Email ไม่ถูกต้อง' })
  }

  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/

  if (!password.match(passwordPattern)) {
    return res.status(400).json({
      error:
        'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรและตัวเลข',
    })
  }

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

    const profileImageFileName = Date.now() + '-' + profileImageFile.name
    profileImageFile.mv(
      'C:/agric/agric-production/public/profileImages' + profileImageFileName
    )

    const profileImageUrl = `/profileImages/${profileImageFileName}`

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
})

app.post('/LoginPage', async (req, res) => {
  const { email, password } = req.body

  try {
    const getUserQuery = `SELECT * FROM users WHERE email = ?`
    const [userResults] = await connection
      .promise()
      .query(getUserQuery, [email])

    if (userResults.length === 0) {
      return res.status(400).json({ error: 'ไม่พบผู้ใช้งานด้วยอีเมลนี้' })
    }

    const user = userResults[0]
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json({ error: 'รหัสผ่านไม่ถูกต้อง' })
    }

    const userId = user.user_id
    const userRole = user.role
    const token = createJWTToken(userId)

    req.session.userId = user.user_id
    req.session.token = token

    console.log('userId:', req.session.userId)
    console.log('Token:', req.session.token)

    // สร้าง cookies
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
    console.error('Error during login:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' })
  }
})

// ต่อไปคือการกำหนดเส้นทาง
app.get('/profile/:userId', async (req, res) => {
  const userId = req.params.userId

  try {
    const getUserQuery = `SELECT username, profileImage, role FROM users WHERE user_id = ?`
    const [userResults] = await connection
      .promise()
      .query(getUserQuery, [userId])

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'ไม่พบผู้ใช้งาน' })
    }

    const user = userResults[0]

    // ส่งข้อมูลรูปโปรไฟล์และชื่อผู้ใช้กลับไปยังไคลเอนต์
    res.status(200).json({
      profileImage: user.profileImage,
      username: user.username,
    })
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' })
  }
})

app.get('/userProfile/:userId', async (req, res) => {
  const userId = req.params.userId

  try {
    const getUserProfileQuery = `SELECT username, profileImage, role FROM users WHERE user_id = ?`
    const [userResults] = await connection
      .promise()
      .query(getUserProfileQuery, [userId])

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'ไม่พบผู้ใช้งาน' })
    }

    const userProfile = userResults[0]

    res.status(200).json({
      profileImage: userProfile.profileImage,
      username: userProfile.username,
    })
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์ผู้ใช้' })
  }
})

app.post('/postProduct', async (req, res) => {
  const { product_name, product_description, product_price, product_type } =
    req.body

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'ไม่พบรูปภาพสินค้า' })
  }

  const productImageFiles = req.files
  const productImageUrls = []

  try {
    const token = req.headers.authorization
    const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey)
    const userId = decoded.userId

    // บันทึกข้อมูลสินค้าลงในตาราง 'products' โดยกำหนดค่า 'user_id' ให้เป็น userId ที่ได้จากการล็อกอิน
    const insertProductQuery = `
      INSERT INTO products (user_id, product_name, product_description, product_price, product_type)
      VALUES (?, ?, ?, ?, ?)
    `

    const [productResult] = await connection
      .promise()
      .query(insertProductQuery, [
        userId,
        product_name,
        product_description,
        product_price,
        product_type,
      ])

    const productId = productResult.insertId

    for (let i = 0; i < Object.keys(productImageFiles).length; i++) {
      const key = `productImage-${i}`
      const productImageFile = productImageFiles[key]
      const productImageFileName = Date.now() + '-' + productImageFile.name
      productImageFile.mv(
        'C:/agric/agric-production/public/imagePruduct/' + productImageFileName
      )
      const productImageUrl = `/imagePruduct/${productImageFileName}`
      productImageUrls.push(productImageUrl)

      // บันทึกรูปภาพลงในตาราง 'product_images' พร้อมกับการอ้างอิงไปยังสินค้าที่เกี่ยวข้อง
      const insertImageQuery = `
        INSERT INTO product_images (product_id, image_url)
        VALUES (?, ?)
      `

      await connection
        .promise()
        .query(insertImageQuery, [productId, productImageUrl])
    }

    console.log('บันทึกข้อมูลสินค้าและรูปภาพสำเร็จ')

    res.status(200).json({ message: 'บันทึกข้อมูลสินค้าและรูปภาพสำเร็จ' })
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูลสินค้าและรูปภาพ', error)
    res
      .status(500)
      .json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูลสินค้าและรูปภาพ' })
  }
})

app.get('/userProducts/:userId', async (req, res) => {
  const userId = req.params.userId

  try {
    // ดึงข้อมูลสินค้าจากฐานข้อมูลที่เชื่อมต่อด้วย userId
    const getProductsQuery = `SELECT * FROM products WHERE user_id = ?`
    const [productsResults] = await connection
      .promise()
      .query(getProductsQuery, [userId])

    if (productsResults.length === 0) {
      return res.status(404).json({ error: 'ไม่พบสินค้าสำหรับผู้ใช้งานนี้' })
    }

    const products = productsResults

    // สร้างอาเรย์เพื่อเก็บข้อมูลรูปภาพสินค้าแต่ละรายการ
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
    console.error('Error fetching user products', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า' })
  }
})

app.get('/allProducts', async (req, res) => {
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
})

// Add this route below your other routes
app.get('/searchProducts', async (req, res) => {
  const { query } = req.query

  try {
    const searchQuery = `%${query}%` // Add wildcard characters for partial matching

    // Modify the SQL query to search for products that match the query
    const searchProductsQuery = `
      SELECT * FROM products
      WHERE product_name LIKE ? OR product_description LIKE ?
    `

    const [searchResults] = await connection
      .promise()
      .query(searchProductsQuery, [searchQuery, searchQuery])

    if (searchResults.length === 0) {
      return res.status(404).json({ error: 'No matching products found' })
    }

    const products = searchResults

    // You can add more data or formatting if needed

    res.status(200).json({ products })
  } catch (error) {
    console.error('Error searching products', error)
    res
      .status(500)
      .json({ error: 'An error occurred while searching for products' })
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/agric/agric-production/publi/profileImages') // แก้ path ตรงนี้
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  },
})

const upload = multer({ storage })

app.post('/uploadProfileImage', upload.single('profileImage'), (req, res) => {
  try {
    const profileImageUrl = `/profileImages/${req.file.filename}`
    res.status(200).json({ imageUrl: profileImageUrl })
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:', error)
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ' })
  }
})

app.get('/uploadedImages', (req, res) => {
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
})

app.post('/logout', (req, res) => {
  req.session.destroy()
  res.status(200).json({ message: 'ออกจากระบบสำเร็จ' })
})

app.listen(port, () => {
  console.log(`Server ทำงานบนพอร์ต ${port}`)
})
