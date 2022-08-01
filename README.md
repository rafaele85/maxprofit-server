##How to install and use locally
1. Download both front end and back end code from github 
2. In each of these folders run npm install
3. In the client folder run npm run start
4. Edit .env in client folder and define params: REACT_APP_API_URL
5. Edit .env in the server folder and define param: PORT
6. In the server folder run npm run build , then npm run start
7. Start browser and navigate to localhost:3000
8. Enter search criteria and click Submit

##Project description

### Backend
* Implemented API server using Express.js, Node.js and Typescript. REST API with one endpoint GET /api/maxprofit.
* Handled CORS issues.
* Implemented algorithm to find the best profit on the backend
* Implemented interface and simple implementation of storage engine to retrieve list of prices.
  For mock implementation generated the list of random prices for the period of 2022-07-01 00:00:00 through
  2022-08-01 00:00:00. The prices are stored in a binary file, each price is a UINT16 value (which means that the values can go from 0 to 65535). Assuming that last 2 digits are decimal points, it gives the range of prices from 0 to 655.35
* Implemented unit tests for the main algorithm and related funcs, using Jest. Covered main positive case, basic negative cases and most logical edge cases.
* Backend server uses layer separation through naming conventions (controllers, services, etc)
* Basic error handling with user-friendly description of each user error
* Deployed to Vercel cloud
* Implemented basic / simple debug and error logger using console.log

### Front end
* Implemented Front End for entering search criteria and submitting request , using React.js and Typescript. To access backend API uses Axios.
* Utilizes styled components for component classes with css-in-js approach
* Basic error handling with user-friendly description of each user error
* Deployed to Vercel cloud

##Algorithm description:
Maintain the global values:
* "current minimum" price - candidate for buy price 
* current minimum price's start index
* current max price - candidate for sell price
* current max price's start index
* current profit - candidate for profit

Initially all these values are not defined.

Iterate over the list of prices starting from the start time.
For each next price check if it is lower than the previous minimum price. 
If it is lower, then replace the current minimum price, else replace min price and its start index.
Next, check the current price and see if it is higher than current min price.
Calculate profit by subtracting current price from global min price.
If profit > current profit, and if current min price > price limit (or if price limit is not set) then 
replace the sell price and sell price index and profit.
Otherwise keep current sell price and current profit.

After going through all prices in the range return the last values of 
* buy time
* buy price
* sell time
* sell price
* profit

Algorithm complexity: O(N) where N is number of seconds between start and end times specified by the user.



## What makes this code production ready:
* Main function of the application works and is tested
* All code is in github
* Automated CI is implemented via Vercel and github actions
* Both front end and back end are written in Typescript
* Main use cases are well covered by unit tests and integration tests
* Code is split into small modules and functions that are easy to read and test
* For the most part the code is stateless, which makes it easy to mock and test
* Extensible architecture for storage engine via interface allows for easy extension to implement complex logic of handling large amount of data

##Future improvements (TODO)
* Move types and functions shared between client and server into shared package
* Change price visual presentation on FE to have two decimal points (prices are stored as 16-bit UINTs now, assuming that the two last digits are decimals)
* Improve the price range by changing the type to UINT32 or (better) to store just diffs for each timestamp
* Test it with larger volume of data (10-50 years or more). See "Optimizations" below for details.
* Improve logical layer separation, add models and repositories
* Put both front end and back end into the same monorepo instead of two separate github repos
* Improve  start scripts, add nodemon, etc
* Localization to allow for messages and labels in language other than English
* Better error handling for unexpected / system errors and timeouts
* Implement linter
* Better test coverage of other files (e.g. validateInput, utilities, storage engine)
* Implement better logger


##Further optimizations:
* Use larger set of data (10-50 years):
  * further optimize data type (e.g. store one one start price and for each second store just diffs, which can take only 1 byte )
  * instead of using concrete array of UINT16 for prices, extend storage engine interface to retrieve next value as a number , regardless of how it stores prices internally
  * Make storage engine load data from disk in pages , e.g. of 100,000 data points, in order to reduce total RAM footprint. 
  How to avoid promise callback overhead for retrieving next price? 
  Access prices within the same page synchronously, but load pages asynchronously.
  Options:
    1. first check if page is over prior to retrieving next value. if page is over, call async method to load next page
    2. don't check , but getNextValue will throw an exception which the consumer should catch, analyse its type and call storage engine async API to load next page
  * Same approach with async loading of pages will allow for "yielding" execution between page loads so that multiple users can use the app without waiting
