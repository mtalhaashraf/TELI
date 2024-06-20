<script lang="ts">
  import SettingsModule from "../settings_module.svelte"
  export let data

  let { profile } = data

  $: console.log(profile)
</script>

<svelte:head>
  <title>Edit Profile</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-6">Settings</h1>

<SettingsModule
  editable={true}
  title="Edit Profile"
  successTitle="Saved Profile"
  formTarget="?/updateProfile"
  fields={[
    {
      id: "fullName",
      label: "Name",
      initialValue: profile?.full_name ?? "",
      placeholder: "Your full name",
      maxlength: 50,
    },
    {
      id: "companyName",
      label: "Company Name",
      initialValue: profile?.company_name ?? "",
      maxlength: 50,
    },
    {
      id: "website",
      label: "Company Website",
      initialValue: profile?.website ?? "",
      maxlength: 50,
    },
    {
      id: "phone",
      label: "Phone",
      initialValue: profile?.phone ?? "",
      maxlength: 12,
    },
    {
      id: "cell",
      label: "Mobile",
      initialValue: profile?.cell ?? "",
      maxlength: 12,
    },
    {
      id: "email2",
      label: "Secondary Email",
      initialValue: profile?.email2 ?? "",
      maxlength: 50,
    },
    {
      id: "status",
      label: "Status",
      initialValue: profile?.status ?? "",
      maxlength: 50,
      readable: true,
    },
  ]}
/>
