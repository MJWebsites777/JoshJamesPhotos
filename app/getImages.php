<?php
	if (empty($_POST['cmd'])) {echo "default"; return;}
	$cmd = $_POST['cmd'];
	//if (empty($_GET['cmd'])) { echo "default"; return;}
	//$cmd = $_GET['cmd'];
	switch ($cmd) {
		case "slideshow":
			$landArray = scandir("images/gallery/landscapes");
			$portArray = scandir("images/gallery/portraits");
			$archArray = scandir("images/gallery/architecture");
			$commArray = scandir("images/gallery/commercial");
			$wedArray = scandir("images/gallery/weddings");
			$slideArray = [];

			function addtoshow($array, $url){
				global $slideArray;
				$count = count($array) - 1;
				$index = 0;
				$pickedIndices = [];
				$iteration = 3;
				for ($i=0; $i < $iteration; $i++) {
					$index = rand(2,$count);
					if (in_array($index, $pickedIndices)) { 
						$i--;
					} else {
						array_push($pickedIndices, $index);
						array_push($slideArray, "images/gallery/".$url."/".$array[$index]);
					}
				}
			}

		//Load Images Into Slideshow Array
			addtoshow($landArray, "landscapes");
			addtoshow($portArray, "portraits");
			addtoshow($archArray, "architecture");
			addtoshow($commArray, "commercial");
			addtoshow($wedArray, "weddings");

		//Randomize images and then serve them
			shuffle($slideArray);

			$counter = 0;
			foreach ($slideArray as $file) {
				echo ($counter === 0 ? $file : "|".$file);
				$counter++;
			}
			break;
		case "landscapes":
			$landArray = scandir("images/gallery/landscapes");
			serveImages($landArray, "landscapes");
			break;
		case "portraits":
			$portArray = scandir("images/gallery/portraits");
			serveImages($portArray, "portraits");
			break;
		case "architecture":
			$archArray = scandir("images/gallery/architecture");
			serveImages($archArray, "architecture");
			break;
		case "commercial":
			$commArray = scandir("images/gallery/commercial");
			serveImages($commArray, "commercial");
			break;
		case "weddings":
			$wedArray = scandir("images/gallery/weddings");
			serveImages($wedArray, "weddings");
			break;
		default:
			echo "default";
			return;
			break;
	}

	function serveImages($array, $url){
		$counter = 0;
		foreach ($array as $file) {
			if ($counter !== 0 && $counter !== 1) {
				echo ($counter === 2 ? "images/gallery/".$url."/".$file : "|images/gallery/".$url."/".$file);
			}
			$counter++;
		}
	}
?>