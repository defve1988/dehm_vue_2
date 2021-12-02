function handle_redundant_route(err) {
   // Ignore the vuex err regarding  navigating to the page they are already on.
   if (
      err.name !== "NavigationDuplicated" &&
      !err.message.includes(
         "Avoided redundant navigation to current location"
      )
   ) {
      // But print any other errors to the console
      console.error(err);
   }
}



export default {
   handle_redundant_route,
}