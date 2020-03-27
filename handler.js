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

module.exports.createRecipe = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const data = (event);
    db.insert('recipe', data)
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
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
                    'Access-Control-Allow-Origin': '*'
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
    db.query(sql,event.pathParameters.name)
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
    const data1 = (event.name, event.cooking_time, event.portions, event.link, event.image,event.instructions);

    db.insert('recipe', data1)
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: "Recipe Created!" + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not create Recipe " + e
            })
        })
    const data2 = (event.ingredients)
    const sql = 'insert into ingredient (name,amount,unit,recipe_name) values ($1,$2,$3,$4)';
    await (data2.map (async (ingredient=>
        db.query('sql', ingredient, event.name)
        .then(res => {
            callback(null,{
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: "Ingredients Created!" + res
            })
        })
        .catch(e => {
            callback(null,{
                statusCode: e.statusCode || 500,
                body: "Could not create Ingredient " + ingredient + e
            })
        }))))
};