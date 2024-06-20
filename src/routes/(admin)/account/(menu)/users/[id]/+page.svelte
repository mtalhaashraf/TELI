<script lang="ts">
  import SettingsModule from "../../settings/settings_module.svelte"

  export let data

  let { profile, editProfile } = data

  $: console.log(editProfile)
</script>

<SettingsModule
  editable={true}
  title="Edit Profile"
  successTitle="Saved Profile"
  formTarget="?/updateProfile"
  redirect="/account/users"
  fields={[
    {
      id: "fullName",
      label: "Name",
      initialValue: editProfile?.full_name ?? "",
      placeholder: "Your full name",
      maxlength: 50,
    },
    {
      id: "companyName",
      label: "Company Name",
      initialValue: editProfile?.company_name ?? "",
      maxlength: 50,
    },
    {
      id: "website",
      label: "Company Website",
      initialValue: editProfile?.website ?? "",
      maxlength: 50,
    },
    {
      id: "phone",
      label: "Phone",
      initialValue: editProfile?.phone ?? "",
      maxlength: 12,
    },
    {
      id: "cell",
      label: "Mobile",
      initialValue: editProfile?.cell ?? "",
      maxlength: 12,
    },
    {
      id: "email2",
      label: "Secondary Email",
      initialValue: editProfile?.email2 ?? "",
      maxlength: 50,
    },
    {
      id: "status",
      label: "Status",
      initialValue: editProfile?.status ?? "",
      maxlength: 50,
      readable: true,
    },
  ]}
/>
