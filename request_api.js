const fs = require('fs');
const axios = require('axios');

axios.get('http://saral.navgurukul.org/api/courses')
    .then(res =>{

        var saral_data=(res.data);
        fs.writeFileSync('./request.json',JSON.stringify(saral_data,null,4));
        
        fs.readFile('./request.json', (err, data) => {
            if (err) throw err;

            var courses = JSON.parse(data);
            var available_courses=(courses.availableCourses);
            
            var c=1
            console.log("                   :: This is your courseses ::");
            console.log();
            for (var i in available_courses){
                console.log(c,".",available_courses[i]["name"]);
                c+=1;

            }

            var id_of_courses=[];
            for (var j in available_courses){
                var id=(available_courses[j]["id"]);
                id_of_courses.push(id);

            }
            
            console.log();
            var prompt=require("prompt-sync")();
            var input=parseInt(prompt("Enter your number for seing ParentExercises: "));
            console.log();
            var all_id=id_of_courses[input-1];
            console.log();
            console.log("id_of_course = ",all_id);
            console.log();
            console.log("  :: This is your ParentExercises ::");
            console.log();

            axios.get('http://saral.navgurukul.org/api/courses/'+String(all_id)+'/exercises')
                .then(res =>{

                    var saral_data2=(res.data);
                    fs.writeFileSync('./request.json',JSON.stringify(saral_data2,null,4));
                    
                    fs.readFile('./request.json', (err, data) => {
                        if (err) throw err;
                        let ex = JSON.parse(data);

                        var count=1;
                            for (var e in ex){
                                var exer=(ex.data);
                                var co=1;
                                var count=1;
                                
                                var slug=[];
                                var childEx_slug=[];
                    
                                for (var k in exer){
                                    console.log("        ",co,".",exer[k]["name"]);
                                    console.log();
                                    co+=1;
                                    var s=(exer[k]["slug"]);
                                    slug.push(s);
                                    var childEx=(exer[k]["childExercises"]);
                                    
                                    for (var a in childEx){
                                        console.log("                :: This is your ChildExercise ::")
                                        console.log();
                                        console.log("                      ",count,".",childEx[a]["name"]);
                                        count+=1;
                                        console.log();

                                        for (var a in childEx){
                                            var child_slug=(childEx[a]["slug"]);
                                            childEx_slug.push(child_slug);
                                            
                                    }
                                    
                                    }
                                    
                                }
                        
                                var prompt=require("prompt-sync")();
                                var input1=parseInt(prompt("Enter your number for seing slug of ParentExerxise: "));
                                var all_slug=slug[input1-1];
                                console.log();
                                console.log("   :: This is your slug of ParentExercise ::");
                                console.log();
                                console.log("          ",all_slug);
                                console.log();

                            
                                var prompt=require("prompt-sync")();
                                var input2=parseInt(prompt("Enter your number for seing slug of ChildExerxise: "));
                                console.log();
                                console.log("   :: This is your slug of ChildExercise ::");
                                console.log();
                                console.log("          ",childEx_slug[input2-1]);
                            
                            }
                            
                    });

                    
                })

                .catch(err =>{
                    console.log(err);

                })
        });


    })

    .catch(err =>{
        console.log(err);

    })

    