import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';

import { FourDInterface } from '../../js44D/js44D/JSFourDInterface';
import { Config } from '../../common/index';

@Injectable()
export class JustWatchItem {
    public static NETFLIX: string = 'Netflix';
    public static AMAZON: string = 'Amazon';
    public static HBOGO: string = 'HBOGO';
    public static HBONOW: string = 'HBONow';
    public static FANDANGO: string = 'Fandango';

    public jwItem: any = null;

    public get justWatchID(): number { return (this.jwItem) ? this.jwItem.id : null }
    public get posterURL(): string { return (this.jwItem) ? 'https://www.justwatch.com/images' + this.jwItem.poster.replace('{profile}', 's332') : '' }
    public get movieURL(): string { return (this.jwItem) ? 'https://www.justwatch.com' + this.jwItem.full_path : '' }

    private userLocale:string = 'en_US'; // this is the default locale for all users

    constructor(public fourD: FourDInterface) {
        if (FourDInterface.authentication && FourDInterface.authentication['location']) {
            if (FourDInterface.authentication.location['locale'] && FourDInterface.authentication.location['locale'] != '') {
                this.userLocale = FourDInterface.authentication.location['locale'];
            }
        }
     }

    public queryJW(title: string, prodYear: number): Promise<any> {
        const contentHeaders = new Headers();
        contentHeaders.append('Accept', 'text/json;text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,*/*;q=0.8'); // need all this crap for 4D V15!!
        let body = { query: title.replace(' ', '+') };
        let jwURL = 'https://apis.justwatch.com/content/titles/'+this.userLocale+'/popular?body=' + JSON.stringify(body);

        return new Promise((resolve, reject) => {
            this.fourD.call4DRESTMethod('REST_ProxyHTTPGet', { url: jwURL })
                .subscribe(
                response => {
                    this.jwItem = null;
                    let resultJSON = response.json();
                    if (resultJSON.items.length === 1) {
                        this.jwItem = resultJSON.items[0];
                    } else {
                        for (var index = 0; index < resultJSON.items.length; index++) {
                            var item = resultJSON.items[index];
                            if (item.title === title && item.original_release_year.toString() === prodYear.toString()) {
                                this.jwItem = item;
                                break;
                            }
                        }
                    }

                    resolve(this.jwItem);

                },
                error => { reject(error) }
                )
        });

    }


    public getJustWatchItem(id: string): Promise<any> {
        const contentHeaders = new Headers();
        contentHeaders.append('Accept', 'text/json;text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,*/*;q=0.8'); // need all this crap for 4D V15!!
        let jwURL = 'https://apis.justwatch.com/content/titles/movie/' + id + '/locale/'+this.userLocale;

        return new Promise((resolve, reject) => {
            this.fourD.call4DRESTMethod('REST_ProxyHTTPGet', { url: jwURL })
                .subscribe(
                response => {
                    this.jwItem = response.json();
                    resolve(this.jwItem);

                },
                error => {
                    this.jwItem = null;
                    reject(error);
                }
                );
        });

    }


    public getServiceURL(service: string, platform=''): string {
        let returnURL = '';

        if (this.jwItem.offers && this.jwItem.offers.length > 0) {
            this.jwItem.offers.forEach(element => {
                if (element.monetization_type === 'flatrate' || element.monetization_type === 'cinema') {
                    // get the web url
                    if (element.urls) {
                        let url = element.urls['standard_web'];
                        if (Config.IS_MOBILE_NATIVE) {
                            if (platform === 'iOS' && element.urls['deeplink_ios'] && element.urls['deeplink_ios'] !='') {
                                //url = element.urls['deeplink_ios'];
                                url = url.replace('http:','nflx:');
                            } else if (element.urls['deeplink_android'] && element.urls['deeplink_android'] !='') {
                                url = element.urls['deeplink_android'];
                            }
                        }
                        switch (element.provider_id) {
                            case 8:
                                if (service === JustWatchItem.NETFLIX) returnURL = url;
                                break;

                            case 7:
                                if (service === JustWatchItem.AMAZON) returnURL = url;
                                break;

                            case 27:
                                if (service === JustWatchItem.HBONOW) returnURL = url;
                                break;

                            case 31:
                                if (service === JustWatchItem.HBOGO) returnURL = url;
                                break;

                            case 60:
                                if (service === JustWatchItem.FANDANGO) returnURL = url;
                                break;
                        }
                    }

                }
            });
        }

        return returnURL;

    }


}