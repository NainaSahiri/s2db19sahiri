var animal = require('../models/animal'); 
 
// List of all animals 
exports.animal_list = async function(req, res) { 
    try{ 
        theanimal = await animal.find(); 
        res.send(theanimal); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
 
// for a specific animal. 
exports.animal_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await animal.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 
 
// Handle animal create on POST. 
exports.animal_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new animal(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"animal_type":"goat", "cost":12, "size":"large"} 
    document.animal_name = req.body.animal_name; 
    document.animal_breed = req.body.animal_breed; 
    document.animal_weight = req.body.animal_weight; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
  
 
// Handle animal delete form on DELETE. 
exports.animal_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: animal delete DELETE ' + req.params.id); 
}; 

//Handle animal update form on PUT. 
exports.animal_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`) 
    try {
        let toUpdate = await animal.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.animal_type) 
               toUpdate.animal_name = req.body.animal_name; 
        if(req.body.cost) toUpdate.animal_breed = req.body.animal_breed; 
        if(req.body.size) toUpdate.animal_weight = req.body.animal_weight; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    }
};

// VIEWS 
// Handle a show all view 
exports.animal_view_all_Page = async function(req, res) { 
    try{ 
        theanimal = await animal.find(); 
        res.render('animal', { title: 'animal Search Results', results: theanimal }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
};

// Handle animal delete on DELETE. 
exports.animal_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await animal.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
}; 

 // Handle a show one view with id specified by query 
 exports.animal_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await animal.findById( req.query.id) 
        res.render('animaldetail',  
{ title: 'animal Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for creating a animal. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.animal_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('animalcreate', { title: 'animal Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 