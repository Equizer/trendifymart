1. Make the Search bar functional also the filter option
2. Enable the seller to upload images of the product from their device
3. Add content on about page
4. Fix the UI of profile page
5. Fix the responsiveness of alert popup - The alert popup on our application is not responsive and the way it is placed is not recommended
6. Make the Stars and review count functional - we obviously cannot let the seller enter the stars and reviews count neither we can add it manually as it is not recommended so we need make a way so that buyers can add review then it will increment the review count and also update the star count.
7. Make the order summary functional ( the amount in the checkout should be according to the cart items )
8. Make the bookmark button toggle between two states one state for already bookmarked and one for the products that are not bookmarked in the bookmarked page the button will be of bookmarked but if pressed it will remove from the bookmark and even on the home page when user scrolls if the product they are shown is already bookmarked then it should show the button of bookmarked.
9. To decide whether to display the bookmarked button or the button to add bookmark we could make an endpoint which will check if the item is bookmarked by the user in the front end the func will recieve the product's id and then the endpoint returns a bool we can use useEffect in productItem and use this endpoint and display button according to the response which would be a boolean we have to fetch and store it in a state as changing it will cause a re-render