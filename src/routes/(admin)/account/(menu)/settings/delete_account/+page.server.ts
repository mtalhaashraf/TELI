import { fail, redirect } from "@sveltejs/kit"

export const actions = {
  deleteAccount: async ({
    request,
    locals: { supabase, supabaseServiceRole, getSession },
  }) => {
    const session = await getSession()
    if (!session) {
      throw redirect(303, "/login")
    }

    const formData = await request.formData()
    const currentPassword = formData.get("currentPassword") as string

    if (!currentPassword) {
      return fail(400, {
        errorMessage:
          "You must provide your current password to delete your account. If you forgot it, sign out then use 'forgot password' on the sign in page.",
        errorFields: ["currentPassword"],
        currentPassword,
      })
    }

    // Check current password is correct before deleting account
    const { error: pwError } = await supabase.auth.signInWithPassword({
      email: session?.user.email || "",
      password: currentPassword,
    })
    if (pwError) {
      // The user was logged out because of bad password. Redirect to error page explaining.
      throw redirect(303, "/login/current_password_error")
    }

    const { error } = await supabaseServiceRole.auth.admin.deleteUser(
      session.user.id,
      true,
    )
    if (error) {
      return fail(500, {
        errorMessage: "Unknown error. If this persists please contact us.",
        currentPassword,
      })
    }

    await supabase.auth.signOut()
    throw redirect(303, "/")
  },
}
