// Declare module for .svg files
declare module '*.svg' {
    const content: string;
    export default content;
  }
  
  // Declare module for .jpg or .jpeg files
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpeg' {
    const content: string;
    export default content;
  }
  
  // Declare module for .png files
  declare module '*.png' {
    const content: string;
    export default content;
  }
  
  // Declare module for .gif files
  declare module '*.gif' {
    const content: string;
    export default content;
  }

  // Declare module for .webp files
  declare module '*.webp' {
    const content: string;
    export default content;
  }
  
  // Declare module for .css files (if you're using CSS modules)
  declare module '*.css' {
    const content: Record<string, string>;
    export default content;
  }
  
  // Declare module for .json files
  declare module '*.json' {
    const value: any;
    export default value;
  }
  