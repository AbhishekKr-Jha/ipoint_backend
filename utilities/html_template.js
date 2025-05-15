

const send_otp_template=(otp)=>`
        <table style="width: 100%; max-width: 600px; margin: auto; border-collapse: collapse;">
          <tr>
            <td style="text-align: center; padding: 20px;">
              <p style="font-size: 30px; margin: 10px 0; color: black;">Almost there</p>
              <p style="font-size: 20px; margin: 10px 0; color: black;">Here is your user verification code:</p>
              <div style="display: inline-block; padding: 10px 20px; background-color: #f1f1f1; border-radius: 10px;">
                <span style="font-size: 24px; color: #53B6F1; font-weight: bold;">${otp}</span>
              </div>
              <p style="font-size: 18px; margin: 20px 0;color:black;">This code will be active for 5 minutes</p>
              <hr style="width: 90%; border: none; border-top: 1px solid #ccc;" />
            </td>
          </tr>
        </table>
      `


      const sending_input_type_file_template=(title,message)=> `
      <table style="width: 100%; max-width: 600px; margin: auto; border-collapse: collapse; font-family: Arial, sans-serif;">
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f9f9f9;">
            <h2 style="color: #333;">📎 You've received a file via QuickDrop</h2>
            
            <p style="font-size: 16px; color: #555;"><strong>Title:</strong> ${title}</p>
            <p style="font-size: 16px; color: #555;"><strong>Message:</strong> ${message}</p>
            <p style="font-size: 16px; color: #555;"><strong>File Name:</strong> {{fileName}}</p>
      
            <p style="margin-top: 30px; font-size: 14px; color: #999;">The file is attached to this email.</p>
          </td>
        </tr>
      </table>
              `



              const share_file_links_template = (title, message, imageFiles = [], applicationFiles = [], videoFiles = [],otherFiles=[]) => `
  
              <table style="width: 100%; max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                <tr>
                  <td style="text-align: center;">
                           pdfs are  ${applicationFiles.length}
                    <h2 style="color: #333;">📁 You've received files via QuickDrop</h2>
                    <p style="font-size: 16px; color: #555;"><strong>Title:</strong> ${title}</p>
                    <p style="font-size: 16px; color: #555;"><strong>Message:</strong> ${message}</p>
                    <hr style="margin: 20px 0;">
                  </td>
                </tr>
            
                ${imageFiles.length > 0 ? `
                  <tr>
                    <td>
                      <h3 style="color: #444;">🖼️ Images</h3>
                      ${imageFiles.map(ele => `
                        <div key="${ele.view_url}" style="margin-bottom: 20px; text-align: center;">
                          <img src="${ele.view_url}" alt="${ele.key.split('/')[3]}" style="max-width: 100%; border: 1px solid #ddd; border-radius: 8px;" />
                          <div>
                            <a href="${ele.view_url}" style="display: inline-block; margin-top: 10px; padding: 6px 14px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Download</a>
                          </div>
                        </div>
                      `).join('')}
                    </td>
                  </tr>
                ` : ''}
            
          ${applicationFiles.length > 0 ? `
  <tr>
    <td>
      <h3 style="color: #444;">📄 Documents</h3>
      ${applicationFiles.map(ele => `
        <div key="${ele.view_url}" style="margin-bottom: 30px;">
          <iframe 
            src="${ele.view_url}" 
            style="width: 100%; height: 400px; border: 1px solid #ccc; border-radius: 8px;"
            frameborder="0">
          </iframe>
          <div style="text-align: center; margin-top: 10px;">
            <a href="${ele.view_url}" style="display: inline-block; padding: 6px 14px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 4px;">
              Download ${ele.key.split('/')[3]}
            </a>
          </div>
        </div>
      `).join('')}
    </td>
  </tr>
` : ''}

            
                ${videoFiles.length > 0 ? `
                  <tr>
                    <td>
                      <h3 style="color: #444;">🎬 Videos</h3>
                      ${videoFiles.map(ele => `
                        <div key="${ele.view_url}" style="margin-bottom: 20px; text-align: center;">
                          <video controls style="max-width: 100%; border-radius: 8px;">
                            <source src="${ele.view_url}" type="video/mp4">
                            Your browser does not support the video tag.
                          </video>
                          <div>
                            <a href="${ele.view_url}" style="display: inline-block; margin-top: 10px; padding: 6px 14px; background-color: #E91E63; color: white; text-decoration: none; border-radius: 4px;">Download</a>
                          </div>
                        </div>
                      `).join('')}
                    </td>
                  </tr>
                ` : ''}
            
                <tr>
                  <td style="text-align: center;">
                    <hr style="margin: 30px 0;">
                    <p style="font-size: 12px; color: #aaa;">QuickDrop — Secure File Sharing Made Simple</p>
                  </td>
                </tr>
              </table>
            `;
            


      export {send_otp_template,sending_input_type_file_template,
        share_file_links_template
      }