import { FourDModel } from 'js44d';

export class ExhibitionRoom extends FourDModel {

	public static kTABLE:string = 'ExhibitionRoom';
	public static kRecordID:string = 'ExhibitionRoom.RecordID';
	public static kCreationDate:string = 'ExhibitionRoom.CreationDate';
	public static kLastUpdateDate:string = 'ExhibitionRoom.LastUpdateDate';
	public static kTimeStamp:string = 'ExhibitionRoom.TimeStamp';
	public static kTheaterID:string = 'ExhibitionRoom.TheaterID';
	public static kRoomIdentification:string = 'ExhibitionRoom.RoomIdentification';
	public static kSpecialRoomFeatures:string = 'ExhibitionRoom.SpecialRoomFeatures';

	tableName:string = 'ExhibitionRoom';
	tableNumber:number = 30;
	primaryKey_:string = 'RecordID';
	fields:Array<any> = [
		{name:'RecordID', longname:'ExhibitionRoom.RecordID', type:'number', required:true, readonly:true, indexed:true, unique:true},
		{name:'CreationDate', longname:'ExhibitionRoom.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'ExhibitionRoom.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'ExhibitionRoom.TimeStamp', type:'string', length:255},
		{name:'TheaterID', longname:'ExhibitionRoom.TheaterID', type:'number', indexed:true, relatesTo:'Theater.RecordID'},
		{name:'RoomIdentification', longname:'ExhibitionRoom.RoomIdentification', type:'string', length:255},
		{name:'SpecialRoomFeatures', longname:'ExhibitionRoom.SpecialRoomFeatures', type:'json'}
	];

	get RecordID():number {return this.get('RecordID');}
	set RecordID(v:number) {this.set('RecordID',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get TheaterID():number {return this.get('TheaterID');}
	set TheaterID(v:number) {this.set('TheaterID',v);}

	get RoomIdentification():string {return this.get('RoomIdentification');}
	set RoomIdentification(v:string) {this.set('RoomIdentification',v);}

	get SpecialRoomFeatures():any {return this.get('SpecialRoomFeatures');}
	set SpecialRoomFeatures(v:any) {this.set('SpecialRoomFeatures',v);}


}
