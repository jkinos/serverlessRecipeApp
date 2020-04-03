const db = require('./db_connect');

module.exports.getAllRecipes = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.getAll('recipe')
        .then(res => {
            callback(null, {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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
//Tämä ei tullut käyttöön lopullisessa versiossa
// module.exports.createRecipe = (event, context, callback) => {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const data = (event);
//     db.insert('recipe', data)
//         .then(res => {
//             callback(null,{
//                 statusCode: 200,
//                 headers: {
//                     'Access-Control-Allow-Origin': '*'
//                 },
//                 body: "Recipe Created!" + res
//             })
//         })
//         .catch(e => {
//             callback(null,{
//                 statusCode: e.statusCode || 500,
//                 body: "Could not create Recipe " + e
//             })
//         })
// };

module.exports.updateRecipe = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    db.updateById('recipe', event.pathParameters.id, data)
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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
    const data = (event);
    db.insert('ingredient', data)
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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
    const data = (event);
    db.updateById('ingredient', event.pathParameters.id, data)
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
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

module.exports.getAllIngredientsByRecipeName = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const sql = 'select * from ingredient where recipe_name=$1';
    db.query(sql,decodeURI(event.pathParameters.name))
        .then(res => {
            callback(null, {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(res)
            })
        })
            .catch(e => {
                callback(null,{
                    statusCode: e.statusCode || 500,
                    body: "Could not get Ingredients " + e
                })
            })
    };

module.exports.createRecipeAndIngredients = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let params=JSON.parse(event.body)
    const recipeSQL = 'insert into recipe (name,cooking_time,portions,link,image,instruction) values ($1,$2,$3,$4,$5,$6)'
    const ingredients = params.ingredients
    const ingredientsSQL = 'insert into ingredient (name,amount,unit,recipe_name) values ($1,$2,$3,$4)'

    await db.query(recipeSQL,params.name,params.cooking_time,params.portions,params.link,params.image,params.instruction)
    await Promise.all(ingredients.map ( i =>
       db.query(ingredientsSQL, i.iname,i.amount,i.unit, params.name)))
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: "The whole god damn recipe created!" + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not create recipe " + e.message(),
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        })
};






module.exports.getShoppingList = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.getAll('shopping_list')
        .then(res => {
            callback(null, {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(res)
            })
        })
        .catch(e => {
            console.log(e);
            callback(null, {
                statusCode: e.statusCode || 500,
                body: 'Error: Could not find shopping list! : ' + e
            })
        })
};


module.exports.getShoppingListItem = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.getById('shopping_list', event.pathParameters.id)
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(res)
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not find shopping list item: " + e
            })
        })
};

module.exports.createShoppingListItem = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    db.insert('shopping_list', data)
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: "Shopping List Item Created!" + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not create Item " + e
            })
        })
};

module.exports.createShoppingListItems = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let params=JSON.parse(event.body)
    const items = params.selected
    const SQL = 'insert into shopping_list (name) values ($1)'

    await Promise.all(items.map ( item =>
        db.query(SQL, item)))
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: "Item added to shopping list! " + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not create recipe " + e.message(),
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
        })
};


module.exports.updateShoppingListItem = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = (event);
    db.updateById('shopping_list', event.pathParameters.id, data)
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: "Shopping List Updated!" + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not update shopping List" + e
            })
        })
};

module.exports.deleteShoppingListItem = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.deleteById('shopping_list', event.pathParameters.id)
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: "Shopping List Item Deleted!"
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not delete Item" + e
            })
        })
};

module.exports.deleteShoppingList = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = JSON.parse(event.body);
    db.deleteAll('shopping_list')
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: "Shopping List succesfully deleted!" + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not delete Shopping list " + e
            })
        })
};

// var AWS = require('aws-sdk');
// const uuid = require('lambda-uuid')
//
// module.exports.requestUploadURL = (event, context, callback) => {
//     const s3 = new AWS.S3();
//     const params = JSON.parse(event.body);
//
//     const s3Params = {
//         Bucket: 'recipe-app-photo-storage',
//         Key:  uuid(),
//         ContentType: params.fileType,
//         ACL: 'public-read',
//     };
//
//     const uploadURL = s3.getSignedUrl('putObject', s3Params);
//
//     callback(null, {
//         statusCode: 200,
//         headers: {
//             'Access-Control-Allow-Origin': '*'
//         },
//         body: JSON.stringify({ uploadURL: uploadURL }),
//     })
// }
