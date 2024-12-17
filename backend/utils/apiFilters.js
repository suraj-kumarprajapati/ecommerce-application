
class APIFilters {

    constructor(model, queryStr) {
        // model 
        this.model = model;
        // query result
        this.queryRes = model;
        // query string
        this.queryStr = queryStr;
    }
 
    search() {
        let queryStrCopy = {...this.queryStr};

        const keyword = queryStrCopy.keyword ? 
        {
            name : {
                $regex : queryStrCopy.keyword,
                $options : 'i',
            }
        } 
        : {};

        // if no keyword is found then it returns all the availabe data
        const result = this.model.find({...keyword});
        // console.log(result);

        this.queryRes = result;

        // useful for chaining opetaion in objects
        return this;
    }

    filters() {
        let queryStrCopy = {...this.queryStr};
        
        // fields to remove from the queryString
        const fieldsToRemove = ['keyword', 'page'];

        // delete the fields from the query string
        fieldsToRemove.forEach((field) => delete queryStrCopy[field]);


        // console.log("==================");
        // console.log(queryStrCopy);
        // console.log("====================");
  

        // advance filters on price, reviews, etc....

        // convert queryStrCopy object to Stringified JSON
        let queryStrCopyStringified = JSON.stringify(queryStrCopy);
        queryStrCopyStringified = queryStrCopyStringified.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        // convert back JSON to js object
        queryStrCopy = JSON.parse(queryStrCopyStringified);
        
        
        // find the result based on the updated query string that is queryStrCopy
        const result = this.queryRes.find(queryStrCopy);
        this.queryRes = result;

        // useful for chaining operation in objects
        return this;
    }

    pagination(resultsPerPage) {
        // current page number
        const currPage = Number(this.queryStr.page) || 1;
        
        // how many results to skip
        const numOfRecordsToskip = Number(resultsPerPage * (currPage - 1));

        // get result after applying limit and skip for pagination
        const result = this.queryRes.skip(numOfRecordsToskip).limit(resultsPerPage);
        this.queryRes = result;

        // for method chaining
        return this;
    }
}

 

export default APIFilters;