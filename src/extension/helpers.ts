/*---------------------------------------------------------
 * Copyright (C) Janne Varjo. All rights reserved.
 * Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 *--------------------------------------------------------*/

'use strict';

/*
    Synchronous walker that returns all the files of a directory
*/
export class Directory
{
    public static GetFiles(directoryPath:string)
    {
        var fs = require('fs');
        var path = require('path');
        var results = [];
        var list = fs.readdirSync(directoryPath);
        list.forEach(function(file) 
        {
            file = directoryPath + '\\' + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) 
            {
                results = results.concat(Directory.GetFiles(file));
            }
            else 
            {
                results.push(file);
            }
        })
        return results
    }
}

export class Path
{
    public static GetExtension(path:string):string
    {
        var index = path.lastIndexOf('.');
        if (index >= 0)
        {
            return path.substring(index);
        }
        else
        {
            return '';
        }
    }
    
    public static GetFileName(path:string):string
    {
        var index = path.lastIndexOf('\\');
        if (index >= 0 && index + 1 < path.length - 1)
        {
            return path.substring(index + 1);
        }
        else
        {
            return path;
        }
    }
    
    public static GetFileNameWithoutExtension(path:string):string
    {
        var fileName = Path.GetFileName(path);
        
        var index = fileName.lastIndexOf('.');
        
        if (index >= 0)
        {
            return fileName.substring(0, index);
        }
        else
        {
            return fileName;
        }
    }
}
