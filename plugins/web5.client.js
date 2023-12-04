import { Web5 } from '@web5/api/browser';

export default defineNuxtPlugin({
    async setup (nuxtApp) {
        let web5;
        let myDID; 

        ({ web5, did: myDID } = await Web5.connect({
            sync: '5s'
        }));
        
        // ({ web5 } = await Web5.connect({
        //     connectedDid: 'did:web:hopeful-robinson-zhmrdhqnfhaq.connect.trinsic.cloud:zSkmHxq7Q2WyQpEy6Ro1ujX',
        //     sync: '5s'
        // }));
        // myDID = web5.did.connectedDid;

        return {
            provide: {
                web5,
                myDID, 
            }
        };
    },
});

 