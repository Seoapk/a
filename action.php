<?php
//Get action from URL
$action = $_GET['action'];
//Database file
$dtb    = 'data.php'     ;
$id     = 'id.txt';

if($action=='new') // add new user
{
//Post Values from index
$nm =$_POST['name']  ;
$am =$_POST['amount'];
$dt =$_POST['date']  ;
$nt =$_POST['note']  ;
//ids
$cntid= file_get_contents($id);
$iddl ='DL'.$cntid.'X';
$idnm ='NM'.$cntid.'X';
$idam ='AM'.$cntid.'X';
$iddt ='DT'.$cntid.'X';
$idnt ='NT'.$cntid.'X';
//Put values to Database in form Table  
//#### URL edit settinge

$cntd = '<td style="cursor:pointer;"  ondblclick="window.location=\'edit.php?action=edit';
$cntd.= '&idnm='.$idnm ;
$cntd.= '&idam='.$idam ;
$cntd.= '&iddt='.$iddt ;
$cntd.= '&idnt='.$idnt ;
$cntd.= '&nm='.$nm.$idnm ;
$cntd.= '&am='.$am.$idam ;
$cntd.= '&dt='.$dt.$iddt ;
$cntd.= '&nt='.$nt.$idnt .'\';" id="';

$cnt = "\n"."\n".'<tr>'."\n" ;
$cnt.= '<td><input class="deletebutton" type="button" value="x" onclick="window.location=\'action.php?action=delete&iddl='.$iddl.'\';"'.'></input></td>'."\n";
$cnt.=$cntd.$idnm.'">'.$nm.'</td>'."\n";
$cnt.=$cntd.$idam.'">'.$am.'</td>'."\n";
$cnt.=$cntd.$iddt.'">'.$dt.'</td>'."\n";
$cnt.=$cntd.$idnt.'">'.$nt.'</td>'."\n";

$cnt.= '</tr>';
 // 2- Open file database for edit
$cnt.= file_get_contents($dtb);
$cntid= file_get_contents($id );
 // 3- put content 
$put = file_put_contents($dtb,$cnt);
$put1 = file_put_contents($id,$cntid+1);
// view new content 
echo "<script> location.href='./view.php'; </script>";

}

if($action=='edit') // edit user	
{
// POST ids FROM HIDDEN INPUT	
$idnm=$_POST['idnm'];
$idam=$_POST['idam'];
$iddt=$_POST['iddt'];	
$idnt=$_POST['idnt'];
//OLD
$nm=$_POST['nm'];
$am=$_POST['am'];
$dt=$_POST['dt'];	
$nt=$_POST['nt'];
//new
$nnm=$_POST['edtname'];
$nam=$_POST['edtamount'];
$ndt=$_POST['edtdate'];	
$nnt=$_POST['edtnote'];
//
$data1= file_get_contents('data.php');
if ($u1  =preg_replace('/id\=\"'.$idnm.'\"\>.*?\</', 'id="'.$idnm.'">'.$nnm.'<', $data1))
{file_put_contents('data.php', $u1);}

$data2= file_get_contents('data.php');
if ($u2  =preg_replace('/id\=\"'.$idam.'\"\>.*?\</', 'id="'.$idam.'">'.$nam.'<', $data2))
{file_put_contents('data.php', $u2);}

$data3= file_get_contents('data.php');
if ($u3  =preg_replace('/id\=\"'.$iddt.'\"\>.*?\</', 'id="'.$iddt.'">'.$ndt.'<', $data3))
{file_put_contents('data.php', $u3);}

$data4= file_get_contents('data.php');
if ($u4  =preg_replace('/id\=\"'.$idnt.'\"\>.*?\</', 'id="'.$idnt.'">'.$nnt.'<', $data4))
{file_put_contents('data.php', $u4);}

//#####################
$data5= file_get_contents('data.php');
if ($u5  =preg_replace('/nm='.$nm.$idnm.'/i', 'nm='.$nnm.$idnm, $data5))
{file_put_contents('data.php', $u5);}

$data6= file_get_contents('data.php');
if ($u6  =preg_replace('/am='.$am.$idam.'/i', 'am='.$nam.$idam, $data6))
{file_put_contents('data.php', $u6);}

$data7= file_get_contents('data.php');
if ($u7  =preg_replace('/dt='.$dt.$iddt.'/i', 'dt='.$ndt.$iddt, $data7))
{file_put_contents('data.php', $u7);}

$data8= file_get_contents('data.php');
if ($u8  =preg_replace('/nt='.$nt.$idnt.'/i', 'nt='.$nnt.$idnt, $data8))
{file_put_contents('data.php', $u8);}

echo "<script> location.href='./view.php'; </script>";
}


if($action=='delete') // delete user	
{
// POST idnm from URL	
//$iddlt = $_GET['idnm'];
//echo 'delete action not ready yet';
//echo $iddlt ;

	$data       = "data.php";

$iddelete   = $_GET['iddl'] ;

try { $fileHandle = fopen($data, 'r');
    if ($fileHandle === false)
        {
        throw new Exception("Error opening the file.");
        }
        $ln = 1; $found = false;
        while (($line = fgets($fileHandle)) !== false)
            {
            if (stripos($line, $iddelete) !== false)
                {
                $file_out = file($data);
                $arr=array($ln-2,$ln-1,$ln,$ln+1,$ln+2,$ln+3,$ln+4,$ln+5);
                foreach($arr as $a)
                        {	
                        unset($file_out[$a]);
                        }
                        file_put_contents($data, implode("", $file_out));
                        echo "<script> location.href='./view.php'; </script>";
                        $found = true;
                }
                        $ln++;
            }
                        if (!$found)
                            { 
                            echo "id not found in the file.";
                            } 
                            fclose($fileHandle);
    }
                            catch (Exception $e)
                                {
                                echo "An error occurred: " . $e->getMessage();
                                }
								
}


?>