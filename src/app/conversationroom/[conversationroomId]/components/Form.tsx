'use client'

import useRoom from '@/app/hooks/useRoom'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPhone } from 'react-icons/hi'
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2'
import MessageInput from '../MessageInput'
import { CldUploadButton } from 'next-cloudinary'
const Form = () => {
  const { conversationroomId } = useRoom()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true })
    axios.post('/api/messages', {
      ...data,
      conversationroomId,
    })
  }

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result?.info?.secure_url,
      conversationroomId,
    })
  }
  return (
    <div
      className="
     flex 
           w-full 
        items-center 
        gap-2 
        border-t 
        bg-white 
        px-4 
        py-4 
        lg:gap-4
        "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="nkm7xdzk"
      >
        <HiPhoto size={30} className="text-gray-700" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="
                        cursor-pointer
                        rounded-full
                        bg-gray-700
                        p-2
                        transition
                        hover:bg-gray-500
                        "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  )
}

export default Form
