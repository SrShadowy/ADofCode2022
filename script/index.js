const getLines = (text) =>
{
    let txt = text+"_input";
    let lines = document.getElementById(txt).value.split('\n');
    txt = "input[name="+text+"Part]:checked";
    let option = document.querySelector(txt).value;

    return {lines, option};
}


function dayone()
{
    let {lines, option} = getLines("DayOne");
    
    let elf_index = 0;
    const elfs = [];
    elfs[0] = 0;
    let max = 0;
    let max2 = 0;
    let max3 = 0;
    let index = 0;
    let index2 = 0;
    let index3 = 0;
    
    lines.forEach(line => {
       if(line == "")
        {
            if(max <  elfs[elf_index])
            {
                if(max2 < max && max3 <= max2)
                {
                    index3 = index2;
                    index2 = index;

                    max3 = max2;
                    max2 = max;
                }

                index = elf_index;
                max = elfs[elf_index];
            }
            
            elf_index++;
            elfs[elf_index] = 0;
        }else{
            elfs[elf_index] += parseInt(line);
        }
    });
    console.log("TOP ELF's")
    console.log("Elf  1 " + index.toString() + " value " + max.toString());
    console.log("Elf  2 " + index2.toString() + " value " + max2.toString());
    console.log("Elf  3 " + index3.toString() + " value " + max3.toString());
    let total = max + max2 + max3;
    console.log("Total : " + total.toString())
    document.getElementById("AnswerOne").value = option > 0 ?  total.toString() : max.toString();
}

function daytwo()
{
    let {lines, option} = getLines("DayTwo");
    const Types = {'A' : 1, 'X' : 1, 'B' : 2, 'Y' : 2, 'C' : 3, 'Z' : 3};
    // 1 Rock 2 Paper 3 Scissors

    const rule = (value1, value2, option) =>
    {
        switch(option)
        {
            case '0':
                if(value1 == value2) return value2+3;

                return ((value1 == 1 && value2 == 2) 
                || (value1 == 2 && value2 == 3) 
                || (value1 == 3 && value2 == 1)) 
                ? value2 + 6 : value2;

            case '1':

                if(value2 == 2)  //draw
                    return value1 + 3;

                if(value2 == 1) //lose
                { 
                    if(value1 == 1) value2 = 3;
                    else if(value1 == 3) value2 = 2;
                    return rule(value1, value2, '0') 
                }
                  
                if(value2 == 3) // win
                {
                    if(value1 == 1) value2 = 2;
                    else if(value1 == 3) value2 = 1;
                    return rule(value1, value2, '0');
                }
                 
            default:
                return 0;
        }
     
    }

    let totalSocre = 0;
    lines.forEach(line => 
        {
            totalSocre += rule(Types[line[0]], Types[line[2]], option);
        })

    console.log(totalSocre);
    document.getElementById("AnswerTwo").value = totalSocre.toString();


}

function daythree()
{
    let {lines, option} = getLines("DayThree");
    let total = 0;

    const divString = (str) =>
    {
        let lgn = str.length /2;
        str1 = str.substring(0,lgn);
        str2 = str.substring(lgn);
        return [str1, str2];
    }

    const foundChar = (char, str) =>
    {
        for(i = 0; i < str.length; i++)
        {
            if(str[i] == char)
                return i;
        }
    }

    const charCode = (char) =>
    {
        let code = char.charCodeAt();
        return code > 96? code-96 : code-(64-26);
    }


    switch(option)
    {
        case '0':
            {

                lines.forEach(line =>
                    {
                        let strs = divString(line);
                        for(let c = 0; c < strs[0].length; c++)
                        {
                            found = foundChar(strs[0][c], strs[1])
                            if(found != undefined)
                            {
                                total += charCode(strs[0][c]);;
                                break;
                            }
                               
                        }
                    })

            }
            break;

        case '1':
            total = 0;
            {
                const group = [];
                for(let i = 0; i < lines.length; i+=3 )
                {
                    const LineOne   = lines[i+0];
                    const LineTwo   = lines[i+1];
                    const LineThree = lines[i+2];

                    for(let character of LineOne.split("")) 
                    {
                        if(!LineTwo.includes(character) 
                        || !LineThree.includes(character)) continue;

                        total += charCode(character);
                        group.push({character, LineOne,  LineTwo, LineThree});
                        break;
                    }
                }
            }
            break;

        default:
           total = 0;
    }



    document.getElementById("AnswerThree").value = total.toString();
    
}

function dayfour()
{
    let {lines, option} = getLines("DayFour");
    let total = 0;

    const listToNum = (line) =>
    {
        const check_par  = line.split(',');
        const parOne        = check_par[0].split('-');
        const partTwo       = check_par[1].split('-');
        const p1 = [parseInt(parOne[0]),    parseInt(parOne[1])]
        const p2 = [parseInt(partTwo[0]),   parseInt(partTwo[1])]
        return [p1, p2]
    } 


    switch(option)
    {
        case '0':
            {
                lines.forEach(line => {
                    const num = listToNum(line);

                    if( (num[0][0] <= num[1][0] && num[0][1] >= num[1][1]) 
                    ||  (num[0][0] >= num[1][0] && num[0][1] <= num[1][1]))
                        total++;
                })

            }
            break;
        case '1':
            {
                lines.forEach(line => {
                    const num = listToNum(line);
                    const list = [];
                    for(let i = num[0][0]; i <= num[0][1]; i++)
                        list.push(i);
                    
                       
                    if(list.includes(num[1][0]) || list.includes(num[1][1]))
                    {
                        console.log(list)
                        console.log(line)
                        total++;
                    } 
                })
            }
            break;
    }


    document.getElementById("AnswerFour").value = total.toString();

}