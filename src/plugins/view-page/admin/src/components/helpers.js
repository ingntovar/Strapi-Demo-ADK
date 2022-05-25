

export const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    try {
      // Show loading state
      setStatus("loading");

      // Create task and link it to the related entry
      const taskRes = await axiosInstance.post(
        "/content-manager/collection-types/plugin::view-page.view-url",
        {
          url: inputValue,
          related: {
            __type: slug,
            id: initialData.id,
          },
        }
      );

      // Refetch tasks list so it includes the created one
      await refetchViewUrl();

      // Remove loading and close popup
      setStatus("success");
      setIsDisabled(true)
    } catch (e) {
      setStatus("error");
    }
  };