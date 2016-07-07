module script{
	import ArrayCollection = mx.collections.ArrayCollection;
	import Alert = mx.controls.Alert;
	import DataGrid = mx.controls.DataGrid;
	import TextInput = spark.components.TextInput;
	import CloseEvent = mx.events.CloseEvent;
	
	export class GridAS{

		private cruid:number = -1;
		private selectIdx:number=-1;
		private sMsg:string="";
		private data_dg:HTMLTableElement;
		private displayArray:Array<any>;
		private name_txt:HTMLInputElement;
		private remark_txt:HTMLInputElement;
		
		public SetGrid(objGrid:HTMLTableElement,dataArray:Array<any>,nameTxt:HTMLInputElement,remarkTxt:HTMLInputElement){
			this.data_dg=objGrid;
			this.displayArray=dataArray;
			this.name_txt=nameTxt;
			this.remark_txt=remarkTxt;
			this.data_dg.dataProvider=this.displayArray;
		}
		public Query(serachTxt:string):void{
			var queryArray:Array<any>= new ArrayCollection();
			var con_name:string=serachTxt;
			
			if(con_name != ""){
				//for(var i:int=0;i<displayArray.length;i++){ 
				for each(var item in this.displayArray){
					if(item.name.toLowerCase().search(con_name) >= 0){
						queryArray.push(item);
					}
				}
				
				this.data_dg.dataProvider=queryArray;
				this.name_txt.value="";
				this.remark_txt.value="";
				
			}else if(queryArray.length == 0){
				this.data_dg.dataProvider=this.displayArray;
			}
		}
		
		public SelectRow():void{
			this.selectIdx=this.data_dg.selectedIndex;
			this.cruid = this.data_dg.selectedItem.id;
			
			this.name_txt.value=this.data_dg.selectedItem.name;
			this.remark_txt.value=this.data_dg.selectedItem.remark;
		}
		
		public Add():void{
			this.sMsg="内容不得为空.";
			if(this.name_txt.value != "" && this.remark_txt.value !=""){
				//Flex自动绑定,JS需测试
				this.displayArray.unshift({id:displayArray.lengththis.,name:name_txt.textthis.value,sex:"N",remark:remark_txt.textthis.value},0);
				this.sMsg="添加成功";
			}
			alert(this.sMsg);
			
		}
		public Update():void{
			this.sMsg="内容不得为空.";
			var item=this.displayArray.[selectIdx]this.;
			if(this.name_txt.value != "" && this.remark_txt.value !=""){
				item.name=this.name_txt.value;
				item.remark=this.remark_txt.value;
				this.data_dg.dataProvider=this.displayArray;
				this.data_dg.selectedIndex=this.selectIdx;
				this.sMsg="修改成功";
			}
			alert(this.sMsg);
			
		}
		public DelConfirm():void{ 
			Alert.yesLabel = 'yes'; 
			Alert.noLabel = 'no'; 
			alert('确认要删除吗','Tip',1|2,null,this.Del);     
		} 
		private Del(event:CloseEvent):void{
			if(event.detail==Alert.YES){ 
				this.displayArray.splice(this.data_dg.selectedIndex);
				this.data_dg.selectedIndex=this.selectIdx>0?this.selectIdx-1:0;
				this.SelectRow();
			}
		}
	}
}