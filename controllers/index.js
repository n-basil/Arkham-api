// import connection from "./connection";


// instanciate a new knex object with the connection requirements attached.
import knex from 'knex';

import { v4 as uuidv4 } from 'uuid';
import { development } from '../knexfile.js';

const localKnex = knex(development);


export default class ArkhamControllers {

    constructor(){
    };


    static recallNodes (){
      return localKnex
          // Structured like a typical SQL query.
          .select('*')
          .from('nodes');
    };

    static recallLinks () {
        return localKnex 
            .select('source', 'target')
            // .select('*')
            .from('links');
    };


    static addNode (uuid, nameInput) {
        return localKnex
            .insert(
                { id: uuid, name : nameInput }
            )            
            .from('nodes');
    };

    static addLink (src, tgt) {
        const uuid = uuidv4();
        // src = src ? src : 1;
        // src = tgt ? tgt : 1;
        return localKnex  
            .insert(
                { id: uuid, source: src, target: tgt}
            )
            .from('links');
    };

    static delLink (src, tgt){
        return localKnex
            .from('links')
            .where('source', src)
            .where('target', tgt)
            .del();
    };

    // static delLinkNodeSrc (delNodeId){
    //     return localKnex
    //         .from('links')
    //         .where('source', delNodeId)
    //         .del();
    // };

    static delLinksForNode (delNodeId) {
        console.log(`Del Links for Node: ${delNodeId}`);
        return localKnex
            .from('links')
            .where('source', delNodeId)
            .orWhere('target', delNodeId)
            .del()
    };

    static delNode (id) {
        
        return localKnex
            .from('nodes')
            .where('id', id)
            .del();
    };

    static getPasswordHashForUser(username) {
        return localKnex("users")
            .where({ username })
            .select("passwordHash")
            .then((data) => data[0].passwordHash);
    };
  
    static createUser(username, passwordHash) {
        return localKnex("users")
            .insert({ username, passwordHash });
    };

}
