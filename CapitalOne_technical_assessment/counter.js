/*
*  Author: Xue Geng
*  Date: 09/23/2019
*
*/


//check this browser support FileReader or not
if (FileReader){
    var reader = new FileReader();
}else {
    alert("Error. Your browser do not support FileReader, please try with other browser.");
}



$(document).ready(function(){
    //
    var input_file = document.getElementById('file_input');
    

    input_file.onchange = function(){
 
        var file = input_file.files[0];

            reader.readAsText(file, 'UTF-8');
            reader.onload = function () {
                //get the content of input file
                row_content = reader.result;
                content = row_content.trim();

                // get Total # of lines
                var total_lines = count_total_lines(content);
                document.getElementById('lines').innerText = total_lines;


                //get Total # of comment lines
                var comment_lines = count_comment_lines(content);
                document.getElementById('comment_lines').innerText = comment_lines;


                //get Total # of single line comments
                var single_lines = count_single_comments();
                document.getElementById('single_line_comments').innerText = single_lines;

                //get Total # of comment lines within block comments
                var block_comments = count_block_comments();
                document.getElementById('in_block').innerText = block_comments;

                //get Total # of block line comments
                var lines_in_block = count_block_line_comments();
                document.getElementById('block_line_comments').innerText = lines_in_block;

                //get Total # of TODOs
                var todos = count_todos();
                document.getElementById('todos').innerText = todos;

            }

    }


});




//Total # of lines
function count_total_lines(content){
    let sum = 0;
    var lines = content.split('\n');
    for (var i in lines){
        sum++;
    }
    return sum;
}

//Total # of comment lines
function count_comment_lines(){
    let sum = 0;
    var lines = content.split('\n');
    for (var i in lines){
        if (lines[i].startsWith("//") 
            || lines[i].includes("//")
            || lines[i].startsWith("/*") 
            || lines[i].startsWith("*")
            || lines[i].includes("#")
            || lines[i].endsWith("*/")
            || lines[i].startsWith("<!--"))
        {
            
            sum++;
        }
    }
    return sum;
}

//Total # of single line comments
function count_single_comments(){
    let sum = 0;
    var lines = content.split('\n');
    for (var i in lines){
        if (lines[i].includes("//")
            ||lines[i].includes("#"))
        {
            sum++;
        }

    }
    return sum;
}

//Total # of comment lines within block comments
function count_block_comments(){ 
    let sum = 0;
    let comment_lines = count_comment_lines();
    let single_lines = count_single_comments();
    sum = comment_lines - single_lines;
    return sum;
}


//Total # of block line comments
function count_block_line_comments(){
    let sum = 0;
    var lines = content.split('\n');
    for (var i in lines){
        if (lines[i].startsWith("/*")
            || lines[i].startsWith("'''"))
        {
            sum++;
        }

    }
    return sum;
}

//Total # of TODOs:
function count_todos(){
    let sum = 0;
    var lines = content.split('\n');
    for (var i in lines){
        if (lines[i].includes("TODO")){
            sum++;
        }

    }
    return sum;
}






















    