import { HiEllipsisVertical } from 'react-icons/hi2'
import PostDelete from './PostDelete'
import PostEdit from './PostEdit'
import { Content } from 'next/font/google'

type Data = {
  id: string
  content: string
}

const PostOption: React.FC<Data> = ({ id, content }) => {
  return (
    <div className="dropdown dropdown-right">
      <HiEllipsisVertical
        tabIndex={0}
        role="button"
        className="hover:cursor-pointer"
      />
      <ul
        tabIndex={0}
        className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <li>
          <a>
            <PostEdit content={content} id={id} />
          </a>
        </li>
        <li>
          <a>
            <PostDelete id={id} />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default PostOption
