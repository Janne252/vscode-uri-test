/*---------------------------------------------------------
 * Copyright (C) Janne Varjo. All rights reserved.
 * Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------*/

'use strict';

import * as vscode from 'vscode';
import {CustomHoverProvider} from './extension/hoverProvider'; 
import {languages, commands, window, workspace, TextDocumentChangeEvent, TextDocument} from 'vscode';
import {Path} from './extension/helpers';

export var supportedLanguages = ['plaintext'];
 
export function activate(context: vscode.ExtensionContext) 
{
    console.log('uri-test is now active!');
    
    context.subscriptions.push(languages.registerHoverProvider(supportedLanguages, new CustomHoverProvider()));
    
    context.subscriptions.push(commands.registerCommand('extension.createDemoFiles', () => 
    {
        var fs = require('fs');
        
        try
        {
            var path1 = workspace.rootPath + "\\test.txt";
            var path2 = workspace.rootPath + "\\plain.txt";
            
            fs.writeFileSync(path1, 'This is a plain text file. Mouse-over the word "plain" to bring up a clickable link.');
            fs.writeFileSync(path2, 'Did you open me via the mouse-over popup? Good. Now edit me.');
            
            var openDocument = workspace.openTextDocument(path1);
            openDocument.then((document:TextDocument) => 
            {
                window.showTextDocument(document); 
            });
        }
        catch (ex)
        {
            window.showErrorMessage(`Unable to create demo files. Please open a workspace folder first. \n${ex.toString()}`);
        }
    }));
    
    workspace.onDidChangeTextDocument((e:TextDocumentChangeEvent) => 
    {
        var document = e.document;
        var fileName = Path.GetFileName(document.fileName);
        
        if (fileName == "plain.txt")
        {
            window.showInformationMessage(`Did a ghost file, starting with '\\\\', appear in 'WORKING FILES'?`);
        }
    });
}

export function deactivate() 
{
    
}