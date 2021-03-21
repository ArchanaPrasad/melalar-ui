"use strict"

import React, {Component} from 'react';
import Board, { addCard, addColumn} from '@lourenci/react-kanban'
import '@lourenci/react-kanban/dist/styles.css'
import ColumnHeader from '../ColumnHeader/ColumnHeader'
import MiniCard from '../MiniCard/MiniCard'
import Modal from '../JobApplicationModal/JobApplicationModal'

import './BoardWrapper.css'


let StatusAPI = require('../../api/status');
let JobApplication = require('../../api/jobApplications')

class BoardWrapper extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            board : {
                columns : []
            },
            modal:false,
            jobStatuses : [],
            selectedJobStatus : {}
        }
    }

    componentDidMount() {
        this.loadColumns();
    }

    loadColumns = () => {
        let statuses = StatusAPI.getStatuses();
        let newColumns = [...this.state.board.columns];

        for(let jobStatus of statuses) {
            let column = {}
            column.id = jobStatus.statusId;
            column.title = jobStatus.name;
            column.cards = []
            newColumns.push(column);
        }

        this.setState({
            board: {
                columns: newColumns
            },
            jobStatuses: statuses
        }, this.loadJobApplications)
    }

    loadJobApplications = () => {
        
        const jobApplications = JobApplication.getJobApplications();
        const newColumns = [...this.state.board.columns];
        
        for(let jobApplication of jobApplications) {
            let card = this.createMiniCard(jobApplication);
            let jobStatusId= jobApplication.statusId;
            let column = this.getColumn(newColumns, jobStatusId);
            if(column != undefined){
                if(column.cards == undefined) {
                    column.cards = [];
                }
                column.cards.push(card);
            } else {
                console.log("Column not created for status: " + jobStatusId);
            }
            
        }
        this.setState(
            {
                board: {
                    columns: newColumns
                }
            }
        )
    }

    createMiniCard = (jobApplication) => {

        const dateObject = new Date(jobApplication.appliedDate * 1000)
        const readableDate= dateObject.toLocaleString('en', {month:'numeric', day:'numeric', year:'numeric'})
        const card = {}
        card.id = jobApplication.id;
        card.companyName = jobApplication.companyName
        card.jobTitle = jobApplication.jobTitle;
        card.logo = jobApplication['logo-url'];
        card.date = readableDate;
        return card;
    }

    getColumn = (columns, columnId) => {
        for(let column of columns) {
            if(column.id == columnId) {
                return column;
            }
        }
        return undefined;
    }

    openAddJobApplicationModal = (jobStatusId) => {
        
        console.log('here');
        let jobStatus = {}
        this.state.jobStatuses.map((item) => {
            if(item.statusId == jobStatusId) {
                jobStatus = item;
            }
        });


        this.setState({
            modal:true,
            selectedJobStatus: jobStatus
        })
    }

    closeAddJobApplicationModal = () => {
        this.setState({
            modal:false,
            selectedJobStatus : {}
        })
    }

    moveCardFromSourceToDestination = (card, source, destination) => {

        const newColumns = this.state.board.columns;
        for(let i = 0 ; i < newColumns.length; i++) {
            let column = newColumns[i];
            if(column.id == source.fromColumnId) {
                let cardIdx = source.fromPosition;
                column.cards.splice(cardIdx, 1)
                break;
            }
        }
        for(let i = 0 ; i < newColumns.length; i++) {
            let column = newColumns[i];
            if(column.id == destination.toColumnId) {
                let cardIdx = destination.toPosition;
                column.cards.splice(cardIdx, 0, card);
                break;
            }
        }

        this.setState({
            board: {
                columns: newColumns
            }
        })

    }

    render() {
        return (
            <div className="board-wrapper">
                <Board 
                    allowAddColumn 
                    disableColumnDrag
                    renderCard={(card, cardBag) => (
                        <MiniCard card={card} cardBag={cardBag}/>
                      )}                    
                    onCardDragEnd={(card, source, destination) => {this.moveCardFromSourceToDestination(card, source, destination)}}
                    renderColumnHeader={(column, columnBag) => (
                        <ColumnHeader column={column} addCard={this.openAddJobApplicationModal} columnBag={columnBag}/>
                    )}
                    >
                    {this.state.board}
                </Board>
                <Modal show={this.state.modal} jobStatus={this.state.selectedJobStatus} handleClose={() => this.closeAddJobApplicationModal()}></Modal>
            </div>
        )
    }
}

export default BoardWrapper;
