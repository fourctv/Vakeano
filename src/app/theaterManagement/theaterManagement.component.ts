import { Component, AfterContentInit } from '@angular/core';

//import { LogService } from '../core/services/logging/log.service';
import { ModalConfig } from '../js44D/angular2-modal/models/ModalConfig';
import { ICustomModalComponent } from '../js44D/angular2-modal/models/ICustomModalComponent';
import { ModalDialogInstance } from '../js44D/angular2-modal/models/ModalDialogInstance';

import { FourDInterface } from '../js44D/js44D/JSFourDInterface';

import { Location, Theater, ExhibitionRoom } from '../moviegenome/index';

@Component({
    moduleId: module.id,
    selector: 'theater-manager',
    templateUrl: 'theaterManagement.component.html',
    styleUrls: ['theaterManagement.component.css']
})

export class TheaterManagementApp implements ICustomModalComponent, AfterContentInit {
    public static dialogConfig: ModalConfig = <ModalConfig>{
        actions: ['Maximize', 'Minimize', 'Close'], position: { top: 100, left: 150 }, selfCentered: true,
        title: 'Location Management',
        isResizable: true,
        width:1200, height:540
    };

    public dialog: ModalDialogInstance;

    public listCount = 0;
    public locationList: Array<Location> = [];
    public currentLocation: Location = new Location();
    public selectedLocation: any;
    public theaterList: Array<Theater> = [];
    public currentTheater: Theater = new Theater();
    public selectedTheater: any;
    public exhibitionRoomList: Array<ExhibitionRoom> = [];
    public currentExhibitionRoom: ExhibitionRoom = new ExhibitionRoom();
    public selectedExhibitionRoom: any;
 
    constructor(private fourD: FourDInterface/*, private logger: LogService*/) {

    }

    ngAfterContentInit() {
        this.refreshLocations();
    }

    refreshLocations() {
        let location = new Location();
        location.getRecords({ query: ['all'] },null,0,-1,'','>'+Location.kLocationName)
            .then(recs => { this.locationList = recs.models })
    }

    selectLocation(target, location) {
        if (this.selectedLocation) {
            this.selectedLocation.classList.remove('selectedItem');
            if (this.selectedTheater) {
                this.selectedTheater.classList.remove('selectedItem');
                this.currentTheater = new Theater();
                this.selectedTheater = null;
                if (this.selectedExhibitionRoom) this.selectedExhibitionRoom.classList.remove('selectedItem');
                this.exhibitionRoomList = [];
                this.currentExhibitionRoom = new ExhibitionRoom();
                this.selectedExhibitionRoom = null;
            }
        }

        this.selectedLocation = target;
        this.currentLocation = location;

        let theater = new Theater();
        theater.getRecords({ query: [Theater.kLocationID + ';=;' + this.currentLocation.RecordID] },null,0,-1,'','>'+Theater.kTheaterName)
            .then((recs) => {
                if (this.selectedLocation) this.selectedLocation.classList.add('selectedItem');
                this.theaterList = recs.models;
            });
    }

    selectTheater(target, theater) {
        if (this.selectedTheater) {
            this.selectedTheater.classList.remove('selectedItem');
            this.selectedTheater = null;
            if (this.selectedExhibitionRoom) this.selectedExhibitionRoom.classList.remove('selectedItem');
            this.exhibitionRoomList = [];
            this.currentExhibitionRoom = new ExhibitionRoom();
            this.selectedExhibitionRoom = null;
        }

        this.selectedTheater = target;
        this.currentTheater = theater;

        let room = new ExhibitionRoom();
        room.getRecords({ query: [ExhibitionRoom.kTheaterID + ';=;' + this.currentTheater.RecordID] },null,0,-1,'','>'+ExhibitionRoom.kRoomIdentification)
            .then((recs) => {
                if (this.selectedTheater) this.selectedTheater.classList.add('selectedItem');
                this.exhibitionRoomList = recs.models;
            });
    }

    selectRoom(target, room) {
        if (this.selectedExhibitionRoom) this.selectedExhibitionRoom.classList.remove('selectedItem');

        this.selectedExhibitionRoom = target;
        this.currentExhibitionRoom = room;
        if (this.selectedExhibitionRoom) this.selectedExhibitionRoom.classList.add('selectedItem');
    }

    currentEditor():string {
        if (this.selectedExhibitionRoom) return 'room';
        if (this.selectedTheater) return 'theater';

        return 'location';
    }

    newTheater() {
        if (this.currentLocation) {
            let theater = new Theater();
            theater.LocationID = this.currentLocation.RecordID;
            theater.TheaterName = 'New Theater';
            theater.insertRecord()
            .then(r => {this.selectLocation(this.selectedLocation, this.currentLocation);});
        }
    }

    newRoom() {
        if (this.currentTheater) {
            let room = new ExhibitionRoom();
            room.TheaterID = this.currentTheater.RecordID;
            room.RoomIdentification = 'New Room';
            room.SpecialRoomFeatures = {};
            room.insertRecord()
            .then(r => {this.selectTheater(this.selectedTheater, this.currentTheater);});
        }
    }

    changeRecord() {
        switch (this.currentEditor()) {
            case 'location':
                this.currentLocation.updateRecord()
                .then(m => {this.refreshLocations()});
                break;

            case 'theater':
                this.currentTheater.updateRecord()
                .then(m => {this.selectLocation(this.selectedLocation, this.currentLocation)});
                break;

            case 'room':
                this.currentExhibitionRoom.updateRecord()
                .then(m => {this.selectTheater(this.selectedTheater, this.currentTheater)});
                break;
        }
    }

    addRecord() {
        switch (this.currentEditor()) {
            case 'location':
                this.currentLocation.insertRecord()
                .then(m => {this.refreshLocations()});
                break;

            case 'theater':
                this.currentTheater.insertRecord()
                .then(m => {this.selectLocation(this.selectedLocation, this.currentLocation)});
                break;

            case 'room':
                this.currentExhibitionRoom.insertRecord()
                .then(m => {this.selectTheater(this.selectedTheater, this.currentTheater)});
                break;
        }

    }

    deleteRecord() {
        switch (this.currentEditor()) {
            case 'location':
                if (confirm('Really delete '+this.currentLocation.LocationName+' record, and all its Theaters and Rooms?')) {
                    this.currentLocation.deleteRecord(true)
                        .then((message) => { alert('Location Deleted'); this.refreshLocations(); })
                        .catch((reason) => { alert(reason); });
                }
                break;

            case 'theater':
                if (confirm('Really delete '+this.currentTheater.TheaterName+' record, and all its Rooms?')) {
                    this.currentTheater.deleteRecord(true)
                        .then((message) => { alert('Theater Deleted'); this.selectLocation(this.selectedLocation, this.currentLocation); })
                        .catch((reason) => { alert(reason); });
                }
                break;

            case 'room':
                if (confirm('Really delete '+this.currentExhibitionRoom.RoomIdentification+' record?')) {
                    this.currentExhibitionRoom.deleteRecord(true)
                        .then((message) => { alert('Theater Room Deleted'); this.selectTheater(this.selectedTheater, this.currentTheater); })
                        .catch((reason) => { alert(reason); });
                }                this.currentExhibitionRoom.updateRecord();
                break;
        }

    }
}
