/*
    Events Controller 
*/

const { response, request } = require('express');
const Event = require('../models/Event');


const getEvents = async (req, res = response) => {

    const events = await Event.find()
                              .populate('user','name');

    res.json({
        ok: true,
        events
    });

}

const createEvent = async (req, res = response) => {

    const event = new Event( req.body );
    try {
        event.user = req.uid;
        const result = await event.save();

        res.json({
            ok: true,
            event: result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error del servidor"
        });        
    }
}

const updateEvent = async (req, res = response) => {

    const id = req.params.id;

    try {
        const event = await Event.findById(id);

        if( !event ){
            res.status(404).json({
                ok: false,
                msg: "event no exist"
            });       
        }

        if(event.user.toString() !== req.uid){
            res.status(401).json({
                ok: false,
                msg: "No autorizado"
            });       
        }

        const newEvent  = {
            ...req.body,
            user: req.uid
        }

        const updateEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true });

        res.json({
            ok: true,
            event: updateEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error del servidor"
        });        
    }

}


const deleteEvent = async (req, res = response) => {

    const id = req.params.id;

    try {

        const event = await Event.findById(id);

        if( !event ){
            res.status(404).json({
                ok: false,
                msg: "event no exist"
            });       
        }

        if(event.user.toString() !== req.uid){
            res.status(401).json({
                ok: false,
                msg: "No autorizado"
            });       
        }


        await Event.findByIdAndDelete(id);

        res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error del servidor"
        });        
    }

}



module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}