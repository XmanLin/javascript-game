window.onload =init; //���ڼ��ط���
//��ȡ���Ĳ���
window.onmousemove = MouseMove;
var  context;
var my_plane, enemys=[],bullets=[];
var cW = 1024;
var cH = 768;
//�ҷ��ӵ��ٶ�

//�ҷ��ɻ���ʼλ��
var my_planeX =512;
var my_planeY = 600;
//�л�����
var score=400;
var p1;


function init(){
    //�ҵ�����
    var canvas = document.getElementById("plane_game");
    context = canvas.getContext("2d");
    game_bg = AddImage("image/bg.png");
    my_plane = AddImage("image/II.png");
    p1=document.getElementById("score");
    //�л����ֵĶ�ʱ��
    setInterval(createEnemy,1000);
    //�ӵ������Ƶ��
    setInterval(creatbullet,200);
    //��ʱ��
    setInterval(GameTick,1000/60);

}
//ˢ�»��Ƶķ���
function GameTick() {
    //log("��"+(i++)+"��");
    clearScreen();//ÿ��ˢ��֮ǰҪ��յ�ǰ��Ļ
    context.drawImage(game_bg, 0, 0);
    context.drawImage(my_plane, my_planeX, my_planeY);
    updateEnemy();
    updatebullet();
    end();
    shoot();

}
//�ݻٵз��ɻ�������
function shoot(){
    for(var i = enemys.length-1;i>=0;i--){
        for(var j = bullets.length-1;j>=0;j--){
            var item = enemys[i];
            var itemb = bullets[j];
            var hit = hit_enemy(item.x,item.y,47,60,itemb.x,itemb.y);
            if(hit){
                enemys.splice(i,1);
                p1.innerText ="����:"+(++score);
                if(score==600){
                    return next();
                }
                bullets.splice(j,1);

                break;
            }
        }
    }
}
function hit_enemy(x1,y1,w1,h1,x2,y2){
    if(x2>=x1 && x2<=x1+w1 &&  y2>=y1 && y2<=y1+h1){
        return true;
    }
    else
    {
        return false;
    }
}
//�����ҷ��ɻ��ݻٵ�����
function end(){
    for(var i = enemys.length-1;i>=0;i--) {
        var item = enemys[i];
        var hit = hitPlane(item.x, item.y, 47,50, my_planeX, my_planeY+4,69,91);//�л��������ȡ�����ѽ�������������������ˣ�����
        if (hit) {
            enemys.splice(i,1);
            endGame();
            break;
        }
    }
}

//x1,y1 �л������ꣻw1,h1�л��Ŀ�ߣ�x2,y2�ҷ��ɻ�������
function hitPlane(x1, y1, w1, h1, x2, y2,w2,h2) {
    if(x1+w1>=x2 && x1<=x2+w2 && y1+h1>=y2 && y1<=y2+h2) {
        return true;
    } else {
        return false;
    }

}
//ˢ�µз��ɻ�
function updateEnemy(){
    for(var i=0;i<enemys.length;i++){
        var item = enemys[i];
        context.drawImage(item.item, item.x, item.y);
        item.x += 0;
        item.y += 14;
    }
}

//�����з��ɻ��ķ���
function createEnemy(){
    for(var i=randomNum(0,23);i<randomNum(10,23);i++){
        for(var j=0;j<randomNum(0,1);j++){
            var item = AddImage("image/enemy.png");
            enemys.push({
                item:item,
                x:50*i,
                y:92*j-100
            })
        }
    }

}
//ˢ���ӵ�
function updatebullet(){
    for(var i=0;i<bullets.length;i++){
        var itemb = bullets[i];
        context.drawImage(itemb.item, itemb.x, itemb.y);
        itemb.x += 0;
        itemb.y -= 4;
        if(itemb.y<0){
            bullets.splice(i,1);
        }
    }
}

//�����ӵ��ķ���
function creatbullet() {

    var itemb = AddImage("image/bullet1.png");
    bullets.push({
        item: itemb,
        x: my_planeX+35,
        y: my_planeY
    })
}
//�������[min,max]֮�������
function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }

}
//�ƶ��ҷ��ɻ��ķ���
function MouseMove(e){

    my_planeX = e.x - my_plane.width/2;
    my_planeY = e.y - my_plane.height/2;
    //�����ߵ�λ��
    if(e.x<= my_plane.width/2) {
        my_planeX = 0;
    }
    //����ұߵ�λ��
    if(e.x>= cW - my_plane.width/2){
        my_planeX =cW-my_plane.width;
    }
    //����ϱߵ�λ��
    if(e.y<=my_plane.height/2){
        my_planeY =0;
    }
    //����±ߵ�λ��
    if(e.y>=cH - my_plane.height/2){
        my_planeY = cH -my_plane.height;
    }

}

//���ͼƬ�ķ���
function AddImage(url){
    var img = new Image();
    img.src=url;
    return img;
}
//��յ�ǰ��Ļ�ķ���
function clearScreen(){
    //��յ�ǰ��Ļ
    context.clearRect(0,0,cW,cH);

}
function endGame(){
    window.location.href="";
}
function next(){
    window.location.href="success.html";
}