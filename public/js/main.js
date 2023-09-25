function get_cookie(cookie_name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.length > 0) {
        let name, value;
        [name, value] = cookie.split('=');
        if (name === cookie_name) return value;
      }
    }
    return null;
  }
  
  const VIEWSTATE = parseInt(get_cookie('viewstate')) || 640;
  document.body.style.width = VIEWSTATE + 'px';
  document.body.style.height = VIEWSTATE + 'px';
  

  window.nzxt = {
    v1: {
      onMonitoringDataUpdate: (data) => {
        const { cpus, gpus, ram } = data;
        update_cpu(cpus[0].temperature);
        update_gpu(gpus[0].temperature);
        update_ram(cpus[0].frequency);
        update_color_kame(cpus[0].temperature);
      },
    },
  };
  
  const cpu_temp = document.getElementById('cpu_temp');
  function update_cpu(temp) {
    cpu_temp.innerHTML = `<b>${Math.round(temp)}°</b>`;
  }
  
  const gpu_temp = document.getElementById('gpu_temp');
  function update_gpu(temp) {
    gpu_temp.innerHTML = `<b>${Math.round(temp)}°</b>`;
  }
  function update_color_kame(temp) {
        var activeBorder = $(".loader span");
        if (temp > 100)
        temp = 100;
        var deg = temp*3.6;
        if (deg <= 180){
            //activeBorder.css('background-image','linear-gradient(' + (90+deg) + 'deg, transparent 50%, #A2ECFB 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)');
            activeBorder.css('background-color','red');
        }
        else{
         activeBorder.css('background-color','red');
        //activeBorder.css('background-image','linear-gradient(' + (deg-90) + 'deg, transparent 50%, #39B4CC 50%),linear-gradient(90deg, #A2ECFB 50%, transparent 50%)');
        }
       
        //activeBorder.css('transform','rotate(' + 0 + 'deg)');
        
    
  }
  
  /* const ram_usage = document.getElementById('ram_usage');
  function update_ram(ram) {
    // Response is in Mebibytes, convert the 'inUse' value to gigabytes. || https://github.com/NZXTCorp/web-integrations-types/blob/main/v1/index.d.ts
    const gbInUse = ram.inUse / 1024;
    ram_usage.innerHTML = `${gbInUse.toFixed(2)} GB`;
  } */
  
   const ram_usage = document.getElementById('ram_usage');
  function update_ram(ram) {
    // Response is in Mebibytes, convert the 'inUse' value to gigabytes. || https://github.com/NZXTCorp/web-integrations-types/blob/main/v1/index.d.ts
    const gbInUse = ram / 1000;
    //ram_usage.innerHTML = `${gbInUse.toFixed(2)} GB`;
    ram_usage.innerHTML = `<b>${gbInUse} GHZ</b>`;
    
    
  } 