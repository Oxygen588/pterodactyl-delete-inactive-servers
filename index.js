
const Nodeactyl = require('nodeactyl');
//set your api key here
const application = new Nodeactyl.NodeactylApplication("https://panel.wehost.dev", "");
const nodemailer = require("nodemailer");



function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }

function dasd(date1, date2) {
	return new Date(date2 - date1).getDate() - 1
}

function javascript(date1, date2) {
    return Math.ceil((date2 - date1) / 8.64e7);
  }
cat = 0
async function a(){
for (let i = 0; i < 200; i++) {

    await application.getUserDetails(i).then(response => {  
    start = new Date(response.attributes.updated_at)
    end = new Date()
    diff = 0
    days = 1000*60*60*24
    diff = end-start
    ziledif = Math.floor(diff/days)
    console.log(ziledif)
    if (ziledif == 0){
        console.log(response.attributes)
    }
    //console.log((Date.now() / 1000 | 0)-toTimestamp(response.attributes.updated_at))
    //var Difference_In_Time = javascript((response.attributes.updated_at),(Date.now()/ 1000 | 0));
  

    //console.log(response.attributes.updated_at)

    }).catch(reason=>{console.log(reason)})
}
}
//a()


async function check(a){
  await application.getServerDetails(a).then(response => {  
    start = new Date(response.updated_at)
    end = new Date()
    diff = 0
    days = 1000*60*60*24
    diff = end-start
    
    ziledif = Math.floor(diff/days)
    ziledif = parseInt(ziledif)
    
   	a_name =response.name
    idntifier = response.identifier
    if ((ziledif>1)&&(response.limits.cpu<50)){// if server has more than 50% cpu allocation then it would not be affected
        application.getUserDetails(response.user).then(response => {  
            cat = cat+1
            //console.log(cat)
            if (ziledif>=2){
            }
            if (ziledif>5){ // if more than 5 days inactive then it will send messages
                console.log(response)
              sendinactivityemail(response.attributes.email,("Hi there "+response.attributes.first_name+" "+response.attributes.last_name+", your service "+a_name+" will be deleted if you do not interact with it for more than 14 days, you currently did not interact with it for "+ziledif+" days!<br></br>To avoid your server getting deleted or stopped again change the port from one to the other or delete and then allocate new port!<img src='https://cdn.discordapp.com/attachments/832627134912004126/989269743070498866/unknown.png' ><img src='https://cdn.discordapp.com/attachments/832627134912004126/989269592339808306/unknown.png' >"))
              console.log(response.attributes.email," - ",ziledif,"  --------",start,(ziledif>14))
                if (ziledif>14){//after 14 days of inactivity the server will get deleted
                    console.log("delete")
                    sendinactivityemail(response.attributes.email,("Hi there "+response.attributes.first_name+" "+response.attributes.last_name+", your service "+a_name+" has been deleted because you did not interact with it for 14 days!<br></br>To avoid your server getting deleted or stopped again change the port from one to the other or delete and then allocate new port!<img src='https://cdn.discordapp.com/attachments/832627134912004126/989269743070498866/unknown.png' ><img src='https://cdn.discordapp.com/attachments/832627134912004126/989269592339808306/unknown.png' >"))
application.deleteServer(a).then(response => {
}).catch(reason=>{})
				}
                
            }else{
                console.log("-- ",response.attributes.email," - ",ziledif,"  --------",start,(ziledif>14))
            }
    }).catch(reason=>{})
    }else{
        console.log(" ----- ",response.attributes.email," - ",ziledif,"  --------",start,(ziledif>14))
    }
    
    
    //console.log((Date.now() / 1000 | 0)-toTimestamp(response.attributes.updated_at))
    //var Difference_In_Time = javascript((response.attributes.updated_at),(Date.now()/ 1000 | 0));
  

    //console.log(response.attributes.updated_at)

    }).catch(reason=>{})
}




async function b(){
  cat = 0
    for (let i = 0; i < 1500; i++) {
      cat = cat+1
      await check(cat)
    }
    cat = 0
setTimeout(() => {
  b()
}, 86400000)

    }

b()



async function sendinactivityemail(to,message,htmla) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
	// complete those with your email details.
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "", // generated ethereal user
        pass: "", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"" <>', // sender address
      to: to, // list of receivers
      subject: "Service Notice", // Subject line
      text: message, // plain text body
        html:message,
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }




//main().catch(console.error);
