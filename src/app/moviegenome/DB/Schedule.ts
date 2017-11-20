import { FourDModel } from 'js44d';

export class Schedule extends FourDModel {

	public static kTABLE:string = 'Schedule';
	public static kRecordID:string = 'Schedule.RecordID';
	public static kCreationDate:string = 'Schedule.CreationDate';
	public static kLastUpdateDate:string = 'Schedule.LastUpdateDate';
	public static kTimeStamp:string = 'Schedule.TimeStamp';
	public static kFeatureID:string = 'Schedule.FeatureID';
	public static kExhibitionRoomID:string = 'Schedule.ExhibitionRoomID';
	public static kTheaterID:string = 'Schedule.TheaterID';
	public static kLocationID:string = 'Schedule.LocationID';
	public static kExhibitionDate:string = 'Schedule.ExhibitionDate';
	public static kExhibitionTimes:string = 'Schedule.ExhibitionTimes';
	public static kSpecialFeatures:string = 'Schedule.SpecialFeatures';
	public static kNotes:string = 'Schedule.Notes';

	tableName:string = 'Schedule';
	tableNumber:number = 12;
	primaryKey_:string = 'RecordID';
	fields:Array<any> = [
		{name:'RecordID', longname:'Schedule.RecordID', type:'number', required:true, readonly:true, indexed:true, unique:true},
		{name:'CreationDate', longname:'Schedule.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'Schedule.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'Schedule.TimeStamp', type:'string', length:255},
		{name:'FeatureID', longname:'Schedule.FeatureID', type:'number', indexed:true, relatesTo:'Features.FeatureId'},
		{name:'ExhibitionRoomID', longname:'Schedule.ExhibitionRoomID', type:'number', indexed:true, relatesTo:'ExhibitionRoom.RecordID'},
		{name:'TheaterID', longname:'Schedule.TheaterID', type:'number', indexed:true, relatesTo:'Theater.RecordID'},
		{name:'LocationID', longname:'Schedule.LocationID', type:'number', indexed:true, relatesTo:'Location.RecordID'},
		{name:'ExhibitionDate', longname:'Schedule.ExhibitionDate', type:'Date'},
		{name:'ExhibitionTimes', longname:'Schedule.ExhibitionTimes', type:'Date'},
		{name:'SpecialFeatures', longname:'Schedule.SpecialFeatures', type:'Date'},
		{name:'Notes', longname:'Schedule.Notes', type:'string'}
	];

	get RecordID():number {return this.get('RecordID');}
	set RecordID(v:number) {this.set('RecordID',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get FeatureID():number {return this.get('FeatureID');}
	set FeatureID(v:number) {this.set('FeatureID',v);}

	get ExhibitionRoomID():number {return this.get('ExhibitionRoomID');}
	set ExhibitionRoomID(v:number) {this.set('ExhibitionRoomID',v);}

	get TheaterID():number {return this.get('TheaterID');}
	set TheaterID(v:number) {this.set('TheaterID',v);}

	get LocationID():number {return this.get('LocationID');}
	set LocationID(v:number) {this.set('LocationID',v);}

	get ExhibitionDate():Date {return this.get('ExhibitionDate');}
	set ExhibitionDate(v:Date) {this.set('ExhibitionDate',new Date(<any>v));}

	get ExhibitionTimes():Date {return this.get('ExhibitionTimes');}
	set ExhibitionTimes(v:Date) {this.set('ExhibitionTimes',new Date(<any>v));}

	get SpecialFeatures():Date {return this.get('SpecialFeatures');}
	set SpecialFeatures(v:Date) {this.set('SpecialFeatures',new Date(<any>v));}

	get Notes():string {return this.get('Notes');}
	set Notes(v:string) {this.set('Notes',v);}


}
