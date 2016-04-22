#!/bin/bash

FOLDER=$1
SET_NO=$2

cd $FOLDER
#CHANGED_FILES=(`ls | cut -d ' ' -f 2 | grep "\.[a-z]"`)

#echo $CHANGED_FILES
#echo ${#arr[$CHANGED_FILES]}

for f in `ls | cut -d ' ' -f 2 | grep "\.[a-z]"`
do
	#echo "$f"
	FILE_NAME=`ls | grep $f`
	#echo "$FILE_NAME"
	NAME_1=`ls | grep $f | cut -d '.' -f 1`
	NAME_2=`ls | grep $f | cut -d '.' -f 2`
	FINAL_NAME_2=`ls | grep $f | cut -d '.' -f 2 | sed 's/&/_/g' | cut -d ' ' -f 2`
	EXT=`ls | grep $f | cut -d '.' -f 3`
	#echo "name 1 $NAME_1 name2 $NAME_2 ext $EXT"

	convert "$NAME_1.$NAME_2.$EXT" "$FINAL_NAME_2"."jpg"
	convert "$NAME_1.$NAME_2" "$FINAL_NAME_2""_changed.jpg"
	echo '<li><a href="singleSwitchTest.html?dir=set'$SET_NO'&image='"$FINAL_NAME_2".'jpg" href="#">'$FINAL_NAME_2'</a></li>'
	#file $f
done
