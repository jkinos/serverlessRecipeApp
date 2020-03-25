const db = require('./db_connect');
// 'use strict';
//
// module.exports.hello = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

module.exports.getAllRecipes = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.getAll('recipe')
        .then(res => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(res)
            })
        })
        .catch(e => {
            console.log(e);
            callback(null, {
                statusCode: e.statusCode || 500,
                body: 'Error: Could not find Recipes: ' + e
            })
        })
};

module.exports.getRecipe = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.getById('recipe', event.pathParameters.id)
        .then(res => {
            callback(null,{
                statusCode: 200,
                body: JSON.stringify(res)
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not find Recipe: " + e
            })
        })
};
module.exports.createRecipe = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    db.insert('recipe', data)
        .then(res => {
            callback(null,{
                statusCode: 200,
                body: "Recipe Created!" + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not create Recipe " + e
            })
        })
};
module.exports.updateRecipe = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    db.updateById('recipe', event.pathParameters.id, data)
        .then(res => {
            callback(null,{
                statusCode: 200,
                body: "Recipe Updated!" + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not update Recipe" + e
            })
        })
};

module.exports.deleteRecipe = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.deleteById('recipe', event.pathParameters.id)
        .then(res => {
            callback(null,{
                statusCode: 200,
                body: "Recipe Deleted!"
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not delete Recipe" + e
            })
        })
};



module.exports.getAllIngredients = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.getAll('ingredient')
        .then(res => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(res)
            })
        })
        .catch(e => {
            console.log(e);
            callback(null, {
                statusCode: e.statusCode || 500,
                body: 'Error: Could not find Ingredients: ' + e
            })
        })
};

module.exports.getIngredient = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.getById('ingredient', event.pathParameters.id)
        .then(res => {
            callback(null,{
                statusCode: 200,
                body: JSON.stringify(res)
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not find Ingredient: " + e
            })
        })
};
module.exports.createIngredient = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    db.insert('ingredient', data)
        .then(res => {
            callback(null,{
                statusCode: 200,
                body: "Ingredient Created!" + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not create Ingredient " + e
            })
        })
};
module.exports.updateIngredient = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    db.updateById('ingredient', event.pathParameters.id, data)
        .then(res => {
            callback(null,{
                statusCode: 200,
                body: "Ingredient Updated!" + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not update Ingredient" + e
            })
        })
};

module.exports.deleteIngredient = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.deleteById('ingredient', event.pathParameters.id)
        .then(res => {
            callback(null,{
                statusCode: 200,
                body: "Ingredient Deleted!"
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not delete Ingredient" + e
            })
        })
};