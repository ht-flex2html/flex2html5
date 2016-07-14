
			import mx.collections.ArrayCollection;
			import script.GridAS;
			
			private var Grid  = new GridAS();
			private var displayArray:ArrayCollection=new ArrayCollection([
				{id:0,name:"Pit",sex:"M",remark:"PT"},
				{id:1,name:"Gary",sex:"M",remark:"GY"},
				{id:2,name:"Lily",sex:"F",remark:"LY"},
				{id:3,name:"Gaga",sex:"F",remark:"GG"},
				{id:4,name:"Jim",sex:"M",remark:"J"},
				{id:5,name:"Jack",sex:"M",remark:"JA"},
				{id:6,name:"Tom",sex:"M",remark:"T"},
				{id:7,name:"Walk",sex:"M",remark:"W"},
				{id:8,name:"Earl",sex:"F",remark:"E"},
				{id:9,name:"Kit",sex:"F",remark:"K"}
			]);
			
			private function initApp(){
				Grid.SetGrid(data_dg,displayArray,name_txt,remark_txt);				
			}
			
			
		
