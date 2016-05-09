'use strict';

import * as vscode from 'vscode';
import {HoverProvider, Hover, TextDocument, Position, CancellationToken} from 'vscode';
import {Directory, Path} from './helpers';

export class CustomHoverProvider implements HoverProvider
{
    
    public provideHover(document:TextDocument, position:Position, token:CancellationToken)
    {
        var files:string[] = Directory.GetFiles(vscode.workspace.rootPath);
        
        var word = document.getText(document.getWordRangeAtPosition(position));
        var hoverMessage = `'${word}' doesn't match a filename in the current workspace. You should probably create ${word}.txt`;
        
        for(var file of files)
        {
            var fileName = Path.GetFileNameWithoutExtension(file);
            
            if (fileName == word)
            {
                hoverMessage = `'${word}' matches the file [${file}](file:${file}) in the workspace.`;
                break;
            }
        }
        
        return new Hover(hoverMessage);
    }
    

}