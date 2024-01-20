import { checkLike, getLike } from '@/lib/actions/user.like'

export async function getServerSideProps(context: any) {
  const { postId, userId } = context.query

  try {
    const initialData = {
      postId: postId,
      userId: userId,
      checkLike: await checkLike(postId, userId, true),
      likeCount: await getLike(postId),
    }

    return {
      props: { initialData },
    }
  } catch (error) {
    console.error('Error fetching initial data:', error)
    return {
      notFound: true,
    }
  }
}
