"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../session";

export async function fetchAccount() {
  try {
    const account = await getCurrentUser();
    if (!account?.id) {
      return null;
    }
    if (account.id) {
      const fetchName = await db.user.findUnique({
        where: {
          id: account?.id,
        },
        select: {
          id: true,
          name: true,
          nickname: true,
          bio: true,
          image: true,
        },
      });
      return fetchName;
    }
  } catch (error) {}
}

export async function fetchUser(id: string) {
  const userID = await getCurrentUser();
  if (!userID?.id) {
    return null;
  }
  if (userID?.id) {
    const fetchUser = await db.user.findUnique({
      where: {
        id: userID?.id,
      },
      select: {
        id: true,
        name: true,
        image: true,
        bio: true,
        nickname: true,
      },
    });
    return fetchUser;
  }
}

export async function fetchUserProfile(id: string) {
  if (!id) {
    return null;
  }
  if (id) {
    const fetchUser = await db.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        image: true,
        bio: true,
        nickname: true,
      },
    });

    return fetchUser;
  }
}

interface contactFacebookBy {
  userId: string;
  Facebook: string;
  path: string;
}

export async function Facebook({
  userId,
  Facebook,
  path,
}: contactFacebookBy): Promise<void> {
  try {
    const currentUser1 = await getCurrentUser();
    if (!currentUser1) {
      throw new Error("user not found");
    }
    await db.user.update({
      where: {
        id: currentUser1.id,
      },
      data: {
        Facebook,
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

interface contactIGBy {
  userId: string;
  IG: string;
  path: string;
}

export async function IG({ userId, IG, path }: contactIGBy) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Not found account");
    }

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        IG,
      },
    });
    revalidatePath(path);
  } catch (error) {}
}

interface contactTiktokBy {
  userId: string;
  Tiktok: string;
  path: string;
}

export async function tiktok({ userId, Tiktok, path }: contactTiktokBy) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Not found account");
    }

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        Tiktok,
      },
    });
    revalidatePath(path);
  } catch (error) {}
}

interface contactTwitterBy {
  userId: string;
  Twitter: string;
  path: string;
}

export async function twitter({ userId, Twitter, path }: contactTwitterBy) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Not found account");
    }

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        Twitter,
      },
    });
    revalidatePath(path);
  } catch (error) {}
}

export async function Fetchcontact(accountId: string) {}

interface Params {
  userId: string;
  image: string;
  path: string;
}

export async function updateImage({
  userId,
  image,
  path,
}: Params): Promise<void> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("User not found");
    }
    await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image,
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function FetchImageProfile() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return null;
    }
    if (user?.id) {
      const fetchImage = await db.user.findUnique({
        where: {
          id: user?.id,
        },
        select: {
          image: true,
        },
      });
      return fetchImage;
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

interface Params_bio {
  userId: string;
  path: string;
  bio: string;
}

export async function updateBio({
  userId,
  path,
  bio,
}: Params_bio): Promise<void> {
  try {
    const currentUser1 = await getCurrentUser();
    if (!currentUser1) {
      throw new Error("user not found");
    }
    await db.user.update({
      where: { id: currentUser1.id },
      data: { bio },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function FetchBio() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return null;
    }
    if (user?.id) {
      const fetchUser = await db.user.findUnique({
        where: {
          id: user?.id,
        },
        select: {
          bio: true,
        },
      });
      return fetchUser;
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

interface Params_Name {
  userId: string;
  name: string;
  path: string;
}

export async function updateName({
  userId,
  name,
  path,
}: Params_Name): Promise<void> {
  try {
    const currentUser1 = await getCurrentUser();
    if (!currentUser1) {
      throw new Error("user not found");
    }
    await db.user.update({
      where: { id: currentUser1.id },
      data: { name },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function FetchName() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return null;
    }
    if (user.id) {
      const FetchName = await db.user.findUnique({
        where: {
          id: user?.id,
        },
        select: {
          name: true,
        },
      });
      return FetchName;
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

interface Params_Nickname {
  userId: string;
  nickname: string;
  path: string;
}

export async function updateNickname({
  userId,
  nickname,
  path,
}: Params_Nickname): Promise<void> {
  try {
    const currentUser1 = await getCurrentUser();
    if (!currentUser1) {
      throw new Error("user not found");
    }
    await db.user.update({
      where: { id: currentUser1.id },
      data: { nickname },
    });
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function FetchNickname() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return null;
    }
    if (user.id) {
      const fetchNickname = await db.user.findUnique({
        where: {
          id: user?.id,
        },
        select: {
          nickname: true,
        },
      });
      return fetchNickname;
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
