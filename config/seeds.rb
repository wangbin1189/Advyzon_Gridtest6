people = [     #users在这里是一个array，里面的元素是杂项hush table
  {name: 'Jon', title: 'CEO', company: 'company 1',   #seed 是给出了列表上的初始值, rake（ruby运行工具）自带一个command，叫 `rake db:seed`,会自动找到这个文件运行。
    education: 'Bachelor', gender: 'Male'},
  {name: 'Bin', title: 'CFO', company: 'company 3',
      education: 'Bachelor', gender: 'Male'},
  {name: 'Ting', title: 'CMO', company: 'company 2',
      education: 'Master', gender: 'Female'},
  {name: 'User1', title: 'title 1', company: 'company 2', education: 'Bachelor', gender: 'Female'},
  {name: 'User2', title: 'title 1', company: 'company 2', education: 'Bachelor', gender: 'Female'},
  {name: 'User3', title: 'title 1', company: 'company 2', education: 'Bachelor', gender: 'Female'},
  {name: 'User4', title: 'title 1', company: 'company 2', education: 'Bachelor', gender: 'Female'},
  {name: 'User5', title: 'title 1', company: 'company 2', education: 'Bachelor', gender: 'Female'},
  {name: 'User6', title: 'title 1', company: 'company 2', education: 'Bachelor', gender: 'Female'},
]

people.each do |u|  #ruby的循环语句，对user数组中的每一个元素进行创建操作
  Person.create(u)
end