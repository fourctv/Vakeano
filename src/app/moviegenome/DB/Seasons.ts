import { FourDModel } from 'js44d';

export class Seasons extends FourDModel {

	public static kTABLE:string = 'Seasons';
	public static kSeasonId:string = 'Seasons.SeasonId';
	public static kIMDBID:string = 'Seasons.IMDBID';
	public static kIMDBTitle:string = 'Seasons.IMDBTitle';
	public static kProdYear:string = 'Seasons.ProdYear';
	public static kProductionTitle:string = 'Seasons.ProductionTitle';
	public static kThemeVector:string = 'Seasons.ThemeVector';
	public static kNarrativeVector:string = 'Seasons.NarrativeVector';
	public static kContentVector:string = 'Seasons.ContentVector';
	public static kExecutionVector:string = 'Seasons.ExecutionVector';
	public static kStyleVector:string = 'Seasons.StyleVector';
	public static kCreationDate:string = 'Seasons.CreationDate';
	public static kLastUpdateDate:string = 'Seasons.LastUpdateDate';
	public static kTimeStamp:string = 'Seasons.TimeStamp';
	public static kSeasonNumber:string = 'Seasons.SeasonNumber';
	public static kSeasonNumForDisplay:string = 'Seasons.SeasonNumForDisplay';
	public static kSeriesID:string = 'Seasons.SeriesID';
	public static kActingType:string = 'Seasons.ActingType';
	public static kNarrativeType:string = 'Seasons.NarrativeType';

	tableName:string = 'Seasons';
	tableNumber:number = 19;
	primaryKey_:string = 'SeasonId';
	fields:Array<any> = [
		{name:'SeasonId', longname:'Seasons.SeasonId', type:'number', required:true, readonly:true, indexed:true, unique:true},
		{name:'IMDBID', longname:'Seasons.IMDBID', type:'string', length:64, indexed:true},
		{name:'IMDBTitle', longname:'Seasons.IMDBTitle', type:'string', required:true, length:100, indexed:true},
		{name:'ProdYear', longname:'Seasons.ProdYear', type:'number', indexed:true},
		{name:'ProductionTitle', longname:'Seasons.ProductionTitle', type:'string', length:100, indexed:true},
		{name:'ThemeVector', longname:'Seasons.ThemeVector', type:'string', length:255, indexed:true},
		{name:'NarrativeVector', longname:'Seasons.NarrativeVector', type:'string', length:255, indexed:true},
		{name:'ContentVector', longname:'Seasons.ContentVector', type:'string', length:255, indexed:true},
		{name:'ExecutionVector', longname:'Seasons.ExecutionVector', type:'string', length:255, indexed:true},
		{name:'StyleVector', longname:'Seasons.StyleVector', type:'string', length:255},
		{name:'CreationDate', longname:'Seasons.CreationDate', type:'Date'},
		{name:'LastUpdateDate', longname:'Seasons.LastUpdateDate', type:'Date'},
		{name:'TimeStamp', longname:'Seasons.TimeStamp', type:'string'},
		{name:'SeasonNumber', longname:'Seasons.SeasonNumber', type:'number', required:true},
		{name:'SeasonNumForDisplay', longname:'Seasons.SeasonNumForDisplay', type:'string', length:10},
		{name:'SeriesID', longname:'Seasons.SeriesID', type:'number', required:true, indexed:true, relatesTo:'Series.SeriesId'},
		{name:'ActingType', longname:'Seasons.ActingType', type:'string', required:true, length:255},
		{name:'NarrativeType', longname:'Seasons.NarrativeType', type:'string', required:true, length:255}
	];

	get SeasonId():number {return this.get('SeasonId');}
	set SeasonId(v:number) {this.set('SeasonId',v);}

	get IMDBID():string {return this.get('IMDBID');}
	set IMDBID(v:string) {this.set('IMDBID',v);}

	get IMDBTitle():string {return this.get('IMDBTitle');}
	set IMDBTitle(v:string) {this.set('IMDBTitle',v);}

	get ProdYear():number {return this.get('ProdYear');}
	set ProdYear(v:number) {this.set('ProdYear',v);}

	get ProductionTitle():string {return this.get('ProductionTitle');}
	set ProductionTitle(v:string) {this.set('ProductionTitle',v);}

	get ThemeVector():string {return this.get('ThemeVector');}
	set ThemeVector(v:string) {this.set('ThemeVector',v);}

	get NarrativeVector():string {return this.get('NarrativeVector');}
	set NarrativeVector(v:string) {this.set('NarrativeVector',v);}

	get ContentVector():string {return this.get('ContentVector');}
	set ContentVector(v:string) {this.set('ContentVector',v);}

	get ExecutionVector():string {return this.get('ExecutionVector');}
	set ExecutionVector(v:string) {this.set('ExecutionVector',v);}

	get StyleVector():string {return this.get('StyleVector');}
	set StyleVector(v:string) {this.set('StyleVector',v);}

	get CreationDate():Date {return this.get('CreationDate');}
	set CreationDate(v:Date) {this.set('CreationDate',new Date(<any>v));}

	get LastUpdateDate():Date {return this.get('LastUpdateDate');}
	set LastUpdateDate(v:Date) {this.set('LastUpdateDate',new Date(<any>v));}

	get TimeStamp():string {return this.get('TimeStamp');}
	set TimeStamp(v:string) {this.set('TimeStamp',v);}

	get SeasonNumber():number {return this.get('SeasonNumber');}
	set SeasonNumber(v:number) {this.set('SeasonNumber',v);}

	get SeasonNumForDisplay():string {return this.get('SeasonNumForDisplay');}
	set SeasonNumForDisplay(v:string) {this.set('SeasonNumForDisplay',v);}

	get SeriesID():number {return this.get('SeriesID');}
	set SeriesID(v:number) {this.set('SeriesID',v);}

	get ActingType():string {return this.get('ActingType');}
	set ActingType(v:string) {this.set('ActingType',v);}

	get NarrativeType():string {return this.get('NarrativeType');}
	set NarrativeType(v:string) {this.set('NarrativeType',v);}


}
