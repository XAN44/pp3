'use client'

import useOtherChat from '@/app/hooks/useOtherchat'
import { Room, User } from '@prisma/client'
import { format } from 'date-fns'
import { useMemo, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoClose, IoTrash } from 'react-icons/io5'
import Avatars from '@/components/sidebar/Avatar'
import { FaFacebook, FaTiktok } from 'react-icons/fa'
import { Text } from '@chakra-ui/react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import Modals from '@/components/sidebar/modals'
import ConfirmModal from './ConfirmModal'
interface ProfileDrawerProps {
  isOpen: boolean
  onClose: () => void
  data: Room & {
    users: User[]
  }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const otherUser = useOtherChat(data)
  const [confirmOpen, setconfirmOpen] = useState(false)

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.AtCreate), 'PP')
  }, [otherUser.AtCreate])

  const title = useMemo(() => {
    return data.name || otherUser.name
  }, [data.name, otherUser.name])

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`
    }

    return 'Active'
  }, [data])

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setconfirmOpen(false)}
      />
      <div className="">
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="
                    fixed 
                    inset-0
                    bg-black
                    bg-opacity-40
                    "
              ></div>
            </Transition.Child>
            <div
              className="
                fixed
                inset-0
                overflow-hidden
                "
            >
              <div
                className="
                    absolute
                    inset-0
                    overflow-hidden
                    "
              >
                <div
                  className="
                            pointer-events-none
                            fixed
                            inset-y-0
                            right-0
                            flex
                            max-w-full
                            pl-10
                            "
                >
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition east-in-out duration-500"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition east-in-out duration-500"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel
                      className="
                                pointer-events-auto
                                w-screen
                                max-w-md
                                "
                    >
                      <div
                        className="
                                    flex
                                    h-full
                                    flex-col
                                    overflow-y-scroll
                                    bg-white
                                    py-6
                                    shadow-xl
                                    "
                      >
                        <div
                          className="
                                        px-4 sm:px-6
                                        "
                        >
                          <div
                            className="
                                            flex
                                            items-start
                                            justify-end
                                            "
                          >
                            <div
                              className="
                                                ml-3
                                                flex
                                                h-7
                                                items-center
                                                "
                            >
                              <button
                                onClick={onClose}
                                type="button"
                                className="
                                                    rounded-md
                                                    bg-white
                                                    text-gray-400
                                                    hover:text-gray-500
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-sky-500
                                                    focus:ring-offset-2
                                                    "
                              >
                                <span className="sr-only">Close Panel</span>
                                <IoClose size={24} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="
                                        relative mt-6
                                        flex-1 px-4
                                        sm:px-6
                                        "
                        >
                          <div
                            className="
                                            flex flex-col items-center

                                            "
                          >
                            <div className="mb-2">
                              <Avatars user={otherUser} />
                            </div>
                            <div className="">{title}</div>
                            <div className="text-sm text-gray-500">
                              {/* {statusText} */}
                              {otherUser.bio}
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                              เข้าร่วมเมื่อ {joinedDate}
                            </div>

                            <div
                              className="
                                                    mt-6
                                                    flex
                                                    w-full
                                                    flex-col
                                                    items-start
                                                    justify-start
                                                    "
                            >
                              <Text as="b" fontSize="medium" color="gray">
                                ช่องทางการติดต่อ
                              </Text>
                              {otherUser.Facebook &&
                              otherUser.IG &&
                              otherUser.Twitter &&
                              otherUser.Tiktok ? (
                                <>
                                  <div
                                    className="
                                                            ml-3 mt-3 flex
                                                            items-center justify-center space-x-2 "
                                  >
                                    <Link
                                      href={otherUser.Facebook}
                                      className="
                                                                flex items-center 
                                                                justify-center "
                                    >
                                      <FaFacebook size={20} />
                                      <Text
                                        as="abbr"
                                        fontSize="inherit"
                                        color="gray"
                                      >
                                        : FACEBOOK
                                      </Text>
                                    </Link>
                                  </div>
                                  <div
                                    className="
                                                                ml-3 mt-3 flex
                                                                items-center justify-center space-x-2 "
                                  >
                                    <Link
                                      href={otherUser.IG}
                                      className="
                                                                flex items-center 
                                                                justify-center "
                                    >
                                      <AiFillInstagram size={20} />
                                      <Text
                                        as="abbr"
                                        fontSize="inherit"
                                        color="gray"
                                      >
                                        : INSTAGRAM
                                      </Text>
                                    </Link>
                                  </div>
                                  <div
                                    className="
                                                        ml-3 mt-3 flex
                                                        items-center justify-center space-x-2 "
                                  >
                                    <Link
                                      href={otherUser.Tiktok}
                                      className="
                                                                flex items-center 
                                                                justify-center "
                                    >
                                      <FaTiktok size={20} />
                                      <Text
                                        as="abbr"
                                        fontSize="inherit"
                                        color="gray"
                                      >
                                        : TIKTOK
                                      </Text>
                                    </Link>
                                  </div>

                                  <div
                                    className="
                                                        ml-3 mt-3 flex
                                                        items-center justify-center space-x-2 "
                                  >
                                    <Link
                                      href={otherUser.Twitter}
                                      className="
                                                                flex items-center 
                                                                justify-center "
                                    >
                                      <FaXTwitter size={20} />
                                      <Text
                                        as="abbr"
                                        fontSize="inherit"
                                        color="gray"
                                      >
                                        : TWITTER
                                      </Text>
                                    </Link>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <Text
                                    as="abbr"
                                    fontSize="inherit"
                                    color="gray"
                                  >
                                    ไม่มีช่องทางการติดต่อ
                                  </Text>
                                </>
                              )}
                            </div>
                            <div
                              className="
                                                my-8 flex gap-10
                                                "
                            >
                              <div
                                onClick={() => setconfirmOpen(true)}
                                className="
                                                    flex
                                                    cursor-pointer
                                                    flex-col
                                                    items-center
                                                    gap-3
                                                    hover:opacity-75
                                                    "
                              >
                                <div
                                  className="
                                                        flex
                                                        h-10
                                                        w-10
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-neutral-100
                                                        "
                                >
                                  <IoTrash size={20} />
                                </div>
                                <div
                                  className="
                                                        text-sm
                                                        font-light
                                                        text-neutral-600

                                                        "
                                >
                                  Delete
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  )
}

export default ProfileDrawer
