const transRepo = require('transaction/repositories/transaction.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');
const errorHandler = require('../../../errorHandler');

var gm = require('gm').subClass({
    imageMagick: true
});


class BookingController {
    /*
    // @Method: edit
    // @Description:  render booking edit page
    */
    async edit(req, res) {
        try {
            let result = {};
            let bookingValue = await transRepo.getById(req.params.id);
            if (!_.isEmpty(bookingValue)) {
                result.booking_data = bookingValue;
                res.render('transaction/views/edit.ejs', {
                    page_name: 'transaction-management',
                    page_title: 'Booking Edit',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry booking not found!");
                res.redirect(namedRouter.urlFor('booking.listing'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* 
    // @Method: update
    // @Description: booking update action
    */
    async update(req, res) {
        try {
            const bookingId = req.body.mid;
            let bookingUpdate = await transRepo.updateById(req.body, bookingId);
            if (bookingUpdate) {
                req.flash('success', "Booking updated successfully");
                res.redirect(namedRouter.urlFor('transaction.listing'));
            } else {
                res.redirect(namedRouter.urlFor('transaction.edit', {
                    id: bookingId
                }));
            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('transaction.edit', {
                id: req.body.mid
            }));
        }

    };


    /* 
    // @Method: list
    // @Description: To get all the booking from DB
    */
    async list(req, res) {
        try {

            res.render('transaction/views/list.ejs', {
                page_name: 'transaction-management',
                page_title: 'Transaction List',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the booking from DB
    */
    async getAllData(req, res) {
        try {
            
            let transactions = await transRepo.getAll(req);
            
            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": transactions.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": transactions.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: transactions.data,
                message: `Data fetched succesfully.`
            };
        } catch (e) {
            throw e;
        }
    }

}

module.exports = new BookingController();