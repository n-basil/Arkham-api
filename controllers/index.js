// import connection from "./connection";


// instanciate a new knex object with the connection requirements attached.
import knex from 'knex';

import { v4 as uuidv4 } from 'uuid';
import { development } from '../knexfile.js';

const localKnex = knex(development);


export default class ArkhamControllers {

    constructor() {
    };


    static recallNodes() {
        return localKnex
            // Structured like a typical SQL query.
            .select('*')
            .from('nodes');
    };

    static recallLinks() {
        return localKnex
            // .select('source', 'target')
            .select('*')
            .from('links');
    };


    static addNode(node) {
        // console.log("KNEX INDEX addNODE: ", node.name)
        const inputId = node.id ? node.id : uuidv4();
        const inputName = node.name ? node.name : "Untittled Node";
        const inputNotes = node.notes ? node.notes : "No user notes";
        const inputType = node.symbolType ? node.symbolType : "circle";
        const inputColor = node.color ? node.color : null;
        const inputSize = node.size ? node.size : null;

        return localKnex
            // .insert({ id: node.id, name: node.name, color: node.color, symbolType: node.symbolType, notes: node.notes, size: node.size })
            .insert({ id: inputId, name: inputName, color: inputColor, symbolType: inputType, notes: inputNotes, size: inputSize })
            .from('nodes');
    };

    static addLink(src, tgt) {
        // const uuid = uuidv4();
        // src = src ? src : 1;
        // src = tgt ? tgt : 1;
        // console.log("KNEX INDEX addLink: ", src, tgt)
        return localKnex
            .insert({ source: src, target: tgt })
            .from('links');
    };

    static delLink(src, tgt) {
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

    static delLinksForNode(delNodeId) {
        // console.log(`Del Links for Node: ${delNodeId}`);
        return localKnex
            .from('links')
            .where('source', delNodeId)
            .orWhere('target', delNodeId)
            .del()
    };

    static delNode(id) {
        // console.log("KNEX INDEX delNODE typeof: ", typeof id);
        return localKnex
            .from('nodes')
            .where('id', id)
            .del();
    };

    static deleteAllNodes() {
        return localKnex
            .from('nodes')
            .del();
    }

    static deleteAllLinks() {
        return localKnex  
            .from('links')
            .del()
    }

    // static getPasswordHashForUser(username) {
    //     return localKnex("users")
    //         .where({ username })
    //         .select("passwordHash")
    //         .then((data) => data[0].passwordHash);
    // };

    // static createUser(username, passwordHash) {
    //     return localKnex("users")
    //         .insert({ username, passwordHash });
    // };

    static getNode(id) {
        return localKnex
            .select("*")
            .from("nodes")
            .where('id', id)
    }

    static getLink(src, tgt) {
        // if (tgt === 'sans') {
        //     return localKnex
        //         .table('links')
        //         .join('nodes', 'links.target', '=', 'nodes.id')
        //         .select('nodes.name', 'nodes.id')
        //         .where('links.source', src)
        // } else if (src === 'sans') {
        //     return localKnex
        //         .table('links')
        //         .join('nodes', 'links.source', '=', 'nodes.id')
        //         .select('nodes.name', 'nodes.id')
        //         .where('links.target', tgt)
        // } else {
            return localKnex
                .select('*')
                .from('links')
                .where('source', src)
                .where('target', tgt)
        // }
    };

    static patchNode(node) {

        const inputId = node.id ? node.id : 1;


        return localKnex
            .table('nodes')
            .where({ id: inputId })
            .update( node )

    };

    static patchLink(link) {
        return localKnex
            .table('links')
            .where({source: link.source})
            .andWhere({target: link.target})
            .update(link)
    }


}
