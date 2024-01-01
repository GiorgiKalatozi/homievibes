import { INewUser } from "@/types";

export async function createUserAccount(user: INewUser) {
  try {
    console.log(user);

    // const newAccount = await account.create(
    //   "unique_id",
    //   user.email,
    //   user.password,
    //   user.name
    // );
    // return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}
