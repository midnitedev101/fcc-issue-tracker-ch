/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app, db) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      // console.log(project)
      // console.log(req.query)
      var params = req.query
      // console.log(req.query)
      // console.log(typeof params._id)
      params._id ? params._id = new ObjectId(req.query._id) : params._id;
      params.open ? params.open = (req.query.open === 'true') : params._open;
      // console.log(typeof params._id)
      // console.log(params._id)
    
      // db.collection('issues').find(req.query).toArray(function (err, issue) {
    db.collection('issues').find(params).toArray(function (err, issue) {
        if(err) {
          // next(err); 
          // res.json({status: 'Could not insert issue on database.'})
          res.json({status: 'Find method returns error: ' +err});
        } else {
          // next(null, issue);
          // console.log(issue);
          res.send(issue);
        }
      });
    
    })
    
    .post(function (req, res, next){
      var project = req.params.project;
    
      var toInsert = {}
      // var issue_title = req.body.issue_title;
      // var issue_text = req.body.issue_text;
      // var created_by = req.body.created_by;
      // var assigned_to = req.body.assigned_to;
      // var status_text = req.body.status_text;
      // var created_on = new Date();
      // var updated_on = new Date();
      // var open = true;
    
      // if (eq.body.issue_title)
      //   toInsert.issue_title = req.body.issue_title;
      // if (req.body.issue_text)
      //   issue_text = req.body.issue_text;
      // if (req.body.created_by)
      //   created_by = req.body.created_by;
      // var assigned_to = req.body.assigned_to;
      // var status_text = req.body.status_text;
      toInsert.issue_title = req.body.issue_title != "" ?  req.body.issue_title : ""
      toInsert.issue_text = req.body.issue_text != "" ?  req.body.issue_text : ""
      toInsert.created_by = req.body.created_by != "" ?  req.body.created_by : ""
      toInsert.assigned_to = req.body.assigned_to != "" ?  req.body.assigned_to : ""
      toInsert.status_text = req.body.status_text != "" ?  req.body.status_text : ""
      toInsert.created_on = new Date();
      toInsert.updated_on = new Date();
      toInsert.open = true;
      
      if (req.body.issue_title === "" || req.body.issue_text === "" || req.body.created_by === "") {
        res.send('Missing required parameters');
      } else {
        // db.collection('issues').insertOne({issue_title: issue_title, issue_text: issue_text, created_by: created_by, assigned_to: assigned_to, status_text: status_text, created_on: created_on, updated_on: updated_on, open: open}, function (err, issue) {
        db.collection('issues').insertOne(toInsert, function (err, issue) {
          if(err) {
            // next(err); 
            // res.json({status: 'Could not insert issue on database.'})
            res.send('Could not insert issue on database.');
          } else {
            // next(null, issue);
            res.json(toInsert);
          }
        });
      }
    
    })
    
    .put(function (req, res, next){
      var project = req.params.project;
      if (req.body._id) {
        var toBeUpdated = {}
        var _id = req.body._id;  
        // console.log(_id);
        // console.log(req.body.issue_title != '')
        if (req.body.issue_title) 
          toBeUpdated.issue_title = req.body.issue_title;
        if (req.body.issue_text)
          toBeUpdated.issue_text = req.body.issue_text;
        if (req.body.created_by)
          toBeUpdated.created_by = req.body.created_by;
        if (req.body.assigned_to)
          toBeUpdated.assigned_to = req.body.assigned_to;
        if (req.body.status_text)
          toBeUpdated.status_text = req.body.status_text;
        
        if (Object.keys(toBeUpdated).length < 1) {
            res.send('no updated field sent')
        }
        
        req.body.open == false ? (toBeUpdated.open = true): (toBeUpdated.open = false);

        toBeUpdated.updated_on = new Date();
        // console.log(req.body)

        // console.log(toBeUpdated)
        if (_id.length != 24) { 
            // res.json({failed: 'could not update ' + _id + ' because of incorrect id'});
            res.send('could not update ' + _id + ' because of incorrect id');
        } else {
          // if (Object.keys(toBeUpdated).length <= 1) {
          //   // console.log('no updates');
          //   res.send('no updated field sent')
          // } else {
            // console.log(Object.keys(toBeUpdated).length)
            // console.log(toBeUpdated);
            db.collection('issues').findOneAndUpdate(
              {_id: ObjectId(_id)},
              { $set: toBeUpdated }, function (err, issue) {
                if(err) {
                  // next(err); 
                  // res.json({status: 'could not update ' +_id})
                  res.send('could not update ' +_id);
                } else {
                  // next(null, issue);
                  // res.json({status: 'successfully updated'})
                  res.send('successfully updated ' +_id);
                }
              });
          // }
        }
      } else {
        // res.json({failed: '_id error'});
        res.send('_id error');
      }
    })
    
    .delete(function (req, res, next){
      var project = req.params.project;
      if (req.body._id) {
        var _id = req.body._id; 
      
        if (_id.length != 24) { 
          // res.json({failed: 'could not delete ' + _id + ' because of incorrect id'});
          res.send('could not delete ' + _id + ' because of incorrect id');
        } else {
          // db.collection('issues').findAndModify(
          //   {'_id': ObjectId(_id), 
          //    'remove': true}, function (err, issue) {
          //     if(err) {
          //       // next(err); 
          //       console.log(err);
          //       res.json({failed: 'could not delete ' + _id});
          //     } else {
          //       // next(null, issue);
          //       // console.log(issue)
          //       res.json({success: 'deleted ' + _id});
          //     }
          //   });
          
          // db.collection('issues').findAndModify(
          //     {'_id': ObjectId(_id)},
          //     {'remove': true, 'new': false}, 
          //     function (err, res) {
          //        if (err)
          //           console.log(err);
          //        else
          //           console.log(res);   
          // });
          
          // db.collection('issues').remove(
          //   {_id: ObjectId(_id)}, 
          //   {justOne: true}, function (err, issue) {
          //     if(err) {
          //       // next(err); 
          //       console.log(err);
          //       res.json({failed: 'could not delete ' + _id});
          //     } else {
          //       // next(null, issue);
          //       // console.log(issue)
          //       res.json({success: 'deleted ' + _id});
          //     }
          //   });
          
          db.collection('issues').findOneAndDelete(                                  
            {_id: ObjectId(_id)}, {projection: {_id: 1}},  function (err, issue) {
              if(err) {                                                               // findOneAndDelete returns no errors
                // next(err); 
                // console.log(err);
                // res.json({failed: 'could not delete ' + _id});
                res.send('could not delete ' + _id)
              } else {                                                                // findOneAndDelete returns no errors
                // next(null, issue);
                // console.log(issue)
                if (issue.value != null)                                              // Found id to be deleted
                  // res.json({success: 'deleted ' + _id});
                  res.send('deleted ' + _id);
                else                                                                  // Cannot find document to be deleted
                  // res.json({failed: 'could not delete ' + _id});
                  res.send('could not delete ' + _id)
              }
            });
          
          // db.collection('issues').findAndRemove(
          //   {_id: ObjectId(_id)},  function (err, issue) {
          //     if(err) {
          //       // next(err); 
          //       console.log(err);
          //       res.json({failed: 'could not delete ' + _id});
          //     } else {
          //       // next(null, issue);
          //       // console.log(issue)
          //       res.json({success: 'deleted ' + _id});
          //     }
          //   });
        }
      } else {
        // res.json({failed: '_id error'});
        res.send('_id error');
      }
    });
    
};
