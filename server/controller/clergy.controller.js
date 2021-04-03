
exports.createClergy = (req, res) => {

    const clergy = new Clergy({
                          firstname: req.body.firstname,
                          lastname: req.body.lastname,
                          age: req.body.age,
                          address: req.body.address,
                        });
 
    // Save a Clergy in the MongoDB
    clergy.save().then(data => {
                    res.status(200).json(data);
                }).catch(err => {
                    res.status(500).json({
                      message: "Fail!",
                      error: err.message
                    });
                });
};

exports.getClergy = (req, res) => {
    Clergy.findById(req.params.id).select('-__v')
        .then(clergy => {
          res.status(200).json(clergy);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Clergy not found with id " + req.params.id,
                    error: err
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Clergy with id " + req.params.id,
                error: err
            });
        });
  };

  exports.clergy = (req, res) => {
    Clergy.find().select('-__v').then(clergyInfos => {
          res.status(200).json(clergyInfos);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
};

exports.deleteClergy = (req, res) => {
    let clergyId = req.params.id

    Clergy.findByIdAndRemove(clergyId).select('-__v -_id')
        .then(clergy => {
            if(!clergy) {
              res.status(404).json({
                message: "Does Not exist a Clergy with id = " + clergyId,
                error: "404",
              });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
              message: "Error -> Can NOT delete a clergy with id = " + clergyId,
              error: err.message
            });
        });
};

exports.updateClergy = (req, res) => {
    // Find Clergy and update it
    Clergy.findByIdAndUpdate(
                      req.body._id, 
                      {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        age: req.body.age,
                        address: req.body.address
                      }, 
                        {new: true}
                    ).select('-__v')
        .then(clergy => {
            if(!clergy) {
                return res.status(404).send({
                    message: "Error -> Can NOT update a clergy with id = " + req.params.id,
                    error: "Not Found!"
                });
            }

            res.status(200).json(clergy);
        }).catch(err => {
            return res.status(500).send({
              message: "Error -> Can not update a clergy with id = " + req.params.id,
              error: err.message
            });
        });
};