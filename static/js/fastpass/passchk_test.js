function Set_Text(s)
{
   var e = document.getElementById('passchk_result');
   if (!e) return;   
   if (e.innerHTML == s) return;
   
   e.innerHTML = s;
}


var OldPass = -1;
function ShowStats()
{
   var pass = document.getElementById('passchk_field').value;
   var r = "";
   
   if (pass == OldPass) return window.setTimeout('ShowStats();', 200);
   OldPass = pass;
   
   if (pass.length == 0)
   {
      Set_Text("Enter a password to see its strength.");
      return window.setTimeout('ShowStats();', 200);
   }
   
   if (pass.length <= 4)
      r += "";
   else if (pass.length < 8)
      r += "";
   
   // First, see if it is a common password.
   if (passchk_fast.passCommon(pass)) r += "";
   
   //r += "<b>Length:</b>  " + pass.length + "<br>\n";
   
   // Calculate frequency chance
   var bits = passchk_fast.passEntropy(pass);
      
	if (bits < 28)
	{
	 r += "";
	 r += "";
	 r += "";
	}
	else if (bits < 36)
	{
	 r += "";
	 r += "";
	 r += "";
	}
	else if (bits < 60)
	{
	 r += "";
	 r += "";
	 r += "";
	 r += "";
	}
	else if (bits < 128)
	{
	 r += "";
	 r += "";
	 r += "";
	}
	else
	{
	 r += "";
	 r += "";
	}
	r += "Entropy:  " + (Math.round(bits * 10) / 10) + " bits\n";
	//r += "<b>Charset Size:</b>  " + passchk_fast.passCharsetSize(pass) + " chars<br>\n";
   
   Set_Text(r);   
   window.setTimeout('ShowStats();', 200);
}

window.setTimeout('ShowStats();', 200);
