<?php	
	$source_image;
	
	if (empty($_POST["img"])) {return;}
	$img = $_POST["img"];
	switch ($img) {
		case "bg":
			$source_image = new Imagick("images/cover.jpg");
			break;
		case "landscape":
			break;
		case "portrait":
			break;
		default:
			echo "default";
			return;
			break;
	}

	
	$size = $source_image->getImageGeometry();
	$source_width = $size['width'];
	$source_height = $size['height'];
	$tile_width = $source_width / 5;
	$tile_height = $source_height / 5;
	echo "[".$tile_width.",".$tile_height."]<br />";
for($w = 0; $w < ($source_width/$tile_width); $w++){
    for($h = 0; $h < ($source_height/$tile_height); $h++){
        $X = $w*$tile_width;
        $Y = $h*$tile_height;

        $image = clone $source_image;
        $image->cropImage($tile_width,$tile_height, $X,$Y);
		$image->setImageFormat("jpeg");
		$image->setImageCompression(Imagick::COMPRESSION_JPEG); 
		$image->setImageCompressionQuality(100);
		$data = $image->getImageBlob();
		echo base64_encode($data)."|MTJG|";
    }
}
?>