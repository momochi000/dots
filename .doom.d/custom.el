(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.

 ;; include all org files in all subfolders under my_stuff/org.
 ;; This is prohibitively slow so i want to constrain that better
 ;;'(org-agenda-files
 ;;   '(org-agenda-files (directory-files-recursively "~/Dropbox/my_stuff/org/" "\\.org$"))))

 ;; This config adds a single file and recursively under the job hunt folder.
 ;; I'll need to change this when I'm no longer looking for work but the example will be helpful
 ;; I also put this in config.el. i'm not sure wehre it belongs really
 (let ((org-directory "~/Dropbox/my_stuff/org"))
   (setq org-agenda-files
         (append
           (list (expand-file-name "dashboard.org" org-directory ))
           (directory-files-recursively (expand-file-name "job_hunt" org-directory)  "\\.org$"))))

(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
