	function genOutput(){

		if(!nameCheck() | !keywordCheck() | !sitenameCheck() | !pinCheck()){
			document.getElementById("data").innerHTML = "Waiting for details...";
			document.getElementById("fullbase64").innerHTML = "";
			document.getElementById("hash").innerHTML = "";
		}else{
			document.getElementById("data").innerHTML = "Calculating...";
			alert("Calculating could take a couple of seconds. Press OK to start.");

			var alltogether;
			alltogether = document.getElementById("sitename").value + document.getElementById("name").value + document.getElementById("keyword").value;

			var hash = CryptoJS.PBKDF2(alltogether, document.getElementById("pin").value, { keySize: 512/32, iterations: 500 }) + "";
			document.getElementById("data").innerHTML = "Generated Password: " + hexToBase64(hash).slice(0, 16);
			document.getElementById("fullbase64").innerHTML = "Full Base64 Hash: " + hexToBase64(hash);
			document.getElementById("hash").innerHTML = "Full Generated Hash: " + hash;
		}


	}

	//https://stackoverflow.com/questions/23190056/hex-to-base64-converter-for-javascript
	function hexToBase64(str) {
  		return btoa(String.fromCharCode.apply(null,
   		 str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
  		);
	}


	function checkFilled(id){
		var idVal = document.getElementById(id).value;
		if(idVal.length < 1){
			return false;
		}
		
		return true;
	}

	function nameCheck(){
		if(checkFilled("name") == false){document.getElementById("boxname").innerHTML ="Please fill in a name."; return false;}
		//passed all checks
		document.getElementById("boxname").innerHTML ="";
		return true;
	}

	function keywordCheck(){
		if(checkFilled("keyword") == false){document.getElementById("boxkeyword").innerHTML = "Please fill in a Master Password."; return false;}
		
		var idVal = document.getElementById("keyword").value;
		if(idVal.length < 8){document.getElementById("boxkeyword").innerHTML = "Master Password needs to be at least 8 characters long."; return false;}
		//Passed all checks
		document.getElementById("boxkeyword").innerHTML ="";
		return true;
	}

	function sitenameCheck(){
		if(checkFilled("sitename") == false){document.getElementById("boxsitename").innerHTML = "Please fill in a site or app name."; return false;}
		
		//passed all checks
		document.getElementById("boxsitename").innerHTML ="";
		return true;
	}

	function pinCheck(){
		if(checkFilled("pin") == false){document.getElementById("boxpin").innerHTML = "Please fill in a pin code."; return false;}
		if(isNaN(document.getElementById("pin").value)){document.getElementById("boxpin").innerHTML = "Pin code must be a number."; return false;}

		var idVal = document.getElementById("pin").value;
		if(idVal.length != 6){document.getElementById("boxpin").innerHTML = "Pin needs to be 6 numbers long."; return false;}

		//passed all checks
		document.getElementById("boxpin").innerHTML ="";
		return true;
	}
	
 	var hashshown = 0;

	function showLongHash(){

		if(hashshown != 1234) {
			document.getElementById("fullbase64").style.visibility = "visible";
			document.getElementById("hash").style.visibility = "visible";
			document.getElementById("showlonghash").innerHTML = "Hide Long Hash";
			hashshown = 1234;
		} else {
			document.getElementById("fullbase64").style.visibility = "hidden";
			document.getElementById("hash").style.visibility = "hidden";
			document.getElementById("showlonghash").innerHTML = "Show Long Hash";
			hashshown = 0;		
		}
	}
