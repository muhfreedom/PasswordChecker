// passchk.js is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the
// Free Software Foundation; either version 3 of the License, or (at your
// option) any later version.
//
// passchk.js is distributed in the hope that it will be useful but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.
//
// The passchk.js archive has a copy of the GNU General Public License,
// but if you did not get it, see <http://www.gnu.org/licenses/>
//
// passchk.js is available from http://rumkin.com/tools/password/passchk.php
//
// Javascript functions for the password checker form

var Common_Words2 = new Array();
var Frequency_Table2 = new Array();

// The compression algorithm is very basic - the first letter is upper case,
// and it means to copy X letters from the previous word.  A = 0, B = 1, etc.
// So, if I had "apple apricot banana", it would compress to
// "AappleCricotAbanana". 
function Parse_Common_Word2()
{
   var i, c, word2;
   
   i = 1;
   c = Common_List2.substr(i, 1);
   while (c == c.toLowerCase() && i < Common_List2.length)
   {
      i ++;
      c = Common_List2.substr(i, 1);
   }
   
   word2 = Common_List2.substr(0, i);
   Common_List2 = Common_List2.substr(i, Common_List2.length);
   
   if (word2.substr(0, 1) == 'A')
   {
      word2 = word2.substr(1, word2.length);
   }
   else
   {
      i = word2.charCodeAt(0) - 'A'.charCodeAt(0);
      word2 = Common_Words2[Common_Words2.length - 1].substr(0, i) +
         word2.substr(1, word2.length);
   }
   
   Common_Words2[Common_Words2.length] = word2;
}

function Parse_Common2()
{
   for (var i = 0; i < 100 && Common_List2.length > 0; i ++)
   {
      Parse_Common_Word2();
   }
   if (Common_List2.length)
   {
      window.setTimeout('Parse_Common2()', 20);
   }
   else
   {
      document.Common_Parsed2 = 1;
   }
}

// The frequency thing is a bit more interesting, but still not too complex.
// Each three letters are base-95 encoded number representing the chance that
// this combination comes next.  Subtract the value of ' ' from each of the
// three, then ((((first_value * 95) + second_value) * 95) + third_value) will
// give you the odds that this pair is grouped together.  The first is "  "
// (non-alpha chars), then " a", " b", etc. " y", " z", "a ", "aa", "ab", and
// so on.  If you decrypt the table successfully, you should see a really large
// number for "qu".
function Parse_Frequency_Token2()
{
   var c;
   
   c = Frequency_List2.charCodeAt(0) - ' '.charCodeAt(0);
   c /= 95;
   c += Frequency_List2.charCodeAt(1) - ' '.charCodeAt(0);
   c /= 95;
   c += Frequency_List2.charCodeAt(2) - ' '.charCodeAt(0);
   c /= 95;
   
   Frequency_List2 = Frequency_List2.substr(3, Frequency_List2.length);
   
   Frequency_Table2[Frequency_Table2.length] = c;
}


function Parse_Frequency2()
{
   for (var i = 0; i < 100 && Frequency_List2.length > 0; i ++)
   {
      Parse_Frequency_Token2();
   }
   if (Frequency_List2.length)
   {
      window.setTimeout('Parse_Frequency2()', 20);
   }
   else
   {
      document.Frequency_Parsed2 = 1;
   }
}


function Get_Index2(c)
{
   c = c.charAt(0).toLowerCase();
   if (c < 'a' || c > 'z')
   {
      return 0;
   }
   return c.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}


function Get_Charset_Size2(pass)
{
   var a = 0, u = 0, n = 0, ns = 0, r = 0, sp = 0, s = 0, chars = 0;
   
   for (var i = 0 ; i < pass.length; i ++)
   {
      var c = pass.charAt(i);
      
      if (a == 0 && 'abcdefghijklmnopqrstuvwxyz'.indexOf(c) >= 0)
      {
         chars += 26;
	 a = 1;
      }
      if (u == 0 && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c) >= 0)
      {
         chars += 26;
	 u = 1;
      }
      if (n == 0 && '0123456789'.indexOf(c) >= 0)
      {
         chars += 10;
	 n = 1;
      }
      if (ns == 0 && '!@#$%^&*()'.indexOf(c) >= 0)
      {
         chars += 10;
	 ns = 1;
      }
      if (r == 0 && "`~-_=+[{]}\\|;:'\",<.>/?".indexOf(c) >= 0)
      {
         chars += 20;
	 r = 1;
      }
      if (sp == 0 && c == ' ')
      {
         chars += 1;
	 sp = 1;
      }
      if (s == 0 && (c < ' ' || c > '~'))
      {
         chars += 32 + 128;
	 s = 1;
      }
   }
   
   return chars;
}


function Set_Text2(s)
{
   var e;
   
   if (! document.getElementById)
   {
      return;
   }
   
   e = document.getElementById('passchk_result2');
   if (! e)
   {
      return;
   }
   
   if (e.innerHTML == s)
   {
      return;
   }
   
   e.innerHTML = s;
}


var OldPass2 = -1;
function ShowStats2()
{
   var pass2 = document.passchk_form2.passchk_pass2.value;
   var plower = pass2.toLowerCase();
   var r = "";
   
   if (pass2 == OldPass2)
   {
      window.setTimeout('ShowStats2();', 200);
      return;
   }
   OldPass2 = pass2;
   
   if (pass2.length == 0)
   {
      Set_Text2("Enter a password to see its strength.");
      window.setTimeout('ShowStats2();', 200);
      return;
   }
   
   if (pass2.length <= 4)
   {
      r += "<b>WARNING:  <font color=red>Very short password!</font></b><br>\n";
   }
   else if (pass2.length < 8)
   {
      r += "<b>WARNING:</b>  <font color=red>Short password!</font><br>\n";
   }
   
   // First, see if it is a common password.
   for (var i = 0; i < Common_Words2.length; i ++)
   {
      if (Common_Words2[i] == plower)
      {
         i = Common_Words2.length;
	 r += "<b>WARNING:  <font color=red>Common password!</font></b><br>\n";
      }
   }
   
   r += "<b>Length:</b>  " + pass2.length + "<br>\n";
   
   // Calculate frequency chance
   if (pass2.length > 1)
   {
      var c, aidx = 0, bits = 0, charSet;
      charSet = Math.log(Get_Charset_Size2(pass2)) / Math.log(2);
      aidx = Get_Index2(plower.charAt(0));
      for (var b = 1; b < plower.length; b ++)
      {
	 var bidx = Get_Index2(plower.charAt(b));
	 c = 1.0 - Frequency_Table2[aidx * 27 + bidx];
	 bits += charSet * c * c;  // Squared = assmume they are good guessers
	 aidx = bidx;
      }
      
      if (bits < 28)
      {
         r += "<b>Strength:  <font color=red>Very Weak</font></b> - ";
	 r += "Try making your password longer, including CAPITALS, or ";
	 r += "adding symbols.<br>\n";
      }
      else if (bits < 36)
      {
         r += "<b>Strength:</b>  <font color=red>Weak</font> - ";
	 r += "Usually good enough for computer login passwords and to ";
	 r += "keep out the average person.<br>\n";
      }
      else if (bits < 60)
      {
         r += "<b>Strength:</b>  <font color=brown>Reasonable</font> - ";
	 r += "This password is fairly secure cryptographically and ";
	 r += "skilled hackers may need some good computing power to ";
	 r += "crack it.  (Depends greatly on implementation!)<br>\n";
      }
      else if (bits < 128)
      {
         r += "<b>Strength:</b>  <font color=green>Strong</font> - ";
	 r += "This password is typically good enough to safely guard ";
	 r += "sensitive information like financial records.<br>\n";
      }
      else
      {
         r += "<b>Strength:</b>  <font color=blue>Very Strong</font> - ";
	 r += "More often than not, this level of security is overkill.<br>\n";
      }
      r += "<b>Entropy:</b>  " + (Math.round(bits * 10) / 10) + " bits<br>\n";
      r += "<b>Charset Size:</b>  " + Get_Charset_Size2(pass2) + 
         " characters<br>\n";
   }
   
   Set_Text2(r);
   
   window.setTimeout('ShowStats2();', 200);
}


function CheckIfLoaded2()
{
   var s = "";
   if (! document.Common_Loaded2)
   {
      s += "Loading common passwords...<br>\n";
   }
   else if (! document.Common_Parsed2)
   {
      if (! document.Common_Parsed_Started2)
      {
         window.setTimeout('Parse_Common()', 50);
	 document.Common_Parsed_Started2 = 1;
      }
      s += "Parsing common passwords... " + 
         Common_List2.length + "<br>\n";
   }
   if (! document.Frequency_Loaded2)
   {
      s += "Loading letter frequency table...<br>\n";
   }
   else if (! document.Frequency_Parsed2)
   {
      if (! document.Frequency_Parsed_Started2)
      {
         window.setTimeout('Parse_Frequency()', 50);
	 document.Frequency_Parsed_Started2 = 1;
      }
      s += "Parsing frequency table... " + 
         Frequency_List2.length + "<br>\n";
   }
   if (s != "")
   {
      Set_Text2(s + "Loading ...");
      window.setTimeout('CheckIfLoaded2()', 200);
      return;
   }
   
   // Loaded. Do initialization thingies.
   Set_Text2("Finished Loading.");
   window.setTimeout('ShowStats2();', 1000);
}

window.setTimeout('CheckIfLoaded2()', 100);
